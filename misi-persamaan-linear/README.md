# MISI PERSAMAAN LINEAR — Matematik Tingkatan 1

Laman permainan: https://hajix91.github.io/JOM-MAIN-BELAJAR/misi-persamaan-linear/

Permainan terdiri daripada 10 soalan setiap level, 4 jawapan pilihan bagi setiap soalan, maklum balas serta penjelasan, markah terkini dan markah terbaik. Level 2 dibuka selepas lulus Level 1 (70/100) dan Level 3 selepas lulus Level 2 (80/100). Trofi Emas diberikan apabila Level 3 mencapai sekurang-kurangnya 80/100.

## Fail
- index.html: antaramuka
- style.css: responsif untuk telefon, tablet, komputer
- script.js: bank 30 soalan, pemarkahan, kemajuan, rekod dan penghantaran

## Google Sheets — untuk guru sahaja
1. Cipta Google Sheets peribadi (jangan kongsi dengan murid). Buka **Extensions > Apps Script**.
2. Padam kod sedia ada dan tampalkan kod di bawah.
3. Simpan, jalankan fungsi setupSheet sekali, berikan keizinan Google.
4. Klik **Deploy > New deployment > Web app**. Execute as: **Me**. Who has access: **Anyone** untuk menerima POST daripada GitHub Pages. Pilihan ini menjadikan endpoint awam, tetapi **bukan Google Sheets**. Kongsikan pautan permainan sahaja, jangan pautan helaian.
5. Salin URL Web App yang berakhir /exec.
6. Dalam script.js, gantikan `MASUKKAN_URL_WEB_APP_DI_SINI` pada `GOOGLE_SCRIPT_URL` dengan URL tersebut dan commit.
7. Cuba selesai satu level, dan pastikan rekod baharu muncul di tab Rekod. Sekiranya tidak, tekan 'Cuba hantar rekod semula' pada peta misi.

### Kod Google Apps Script lengkap
```javascript
const SHEET_NAME = "Rekod";
const HEADERS = ["Timestamp","Attempt_ID","Student_ID","Nama","Kelas","Level","Skor","Betul","Status","Masa_Saat","Bab","Markah_Terbaik"];
function getSheet_(){
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sh = book.getSheetByName(SHEET_NAME);
  if (!sh) sh = book.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}
function setupSheet(){
  const sh = getSheet_();
  sh.setFrozenRows(1);
}
function existing_(sh, attempt){
  if (!attempt || !/^[\w-]{8,100}$/.test(attempt)) return false;
  if (sh.getLastRow() < 2) return false;
  return !!sh.getRange(2,2,sh.getLastRow()-1,1)
    .createTextFinder(attempt).matchEntireCell(true).findNext();
}
function doPost(e){
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) return ContentService.createTextOutput("BUSY");
  try{
    const d = JSON.parse(e.postData.contents);
    if (!d.Attempt_ID || !d.Student_ID || !d.Nama || !d.Kelas) throw Error("Maklumat tidak lengkap");
    if (!Number.isInteger(d.Skor) || d.Skor < 0 || d.Skor > 100 || d.Skor % 10 !== 0 ||
        d.Betul !== d.Skor/10 || !Number.isInteger(d.Masa_Saat) || d.Masa_Saat < 1 ||
        !/^Level [123] /.test(d.Level) || !["LULUS","GAGAL"].includes(d.Status)) throw Error("Rekod tidak sah");
    const sh = getSheet_();
    if (!existing_(sh,String(d.Attempt_ID))) {
      const safe = v => typeof v === "string" && /^[=+\-@]/.test(v) ? "'"+v : v;
      sh.appendRow([new Date(),d.Attempt_ID,d.Student_ID,safe(String(d.Nama).slice(0,80)),
        safe(String(d.Kelas).slice(0,40)),d.Level,d.Skor,d.Betul,d.Status,d.Masa_Saat,
        d.Bab || "Bab 6",d.Markah_Terbaik ?? ""]);
    }
    return ContentService.createTextOutput("OK");
  }catch(err){
    console.error(err);
    return ContentService.createTextOutput("ERROR");
  }finally{lock.releaseLock();}
}
function doGet(e){
  const p = e.parameter || {};
  const attempt = String(p.attempt_id || "");
  const cb = String(p.callback || "");
  if (p.action !== "check" || !/^ack[a-z0-9]+$/.test(cb)) {
    return ContentService.createTextOutput("INVALID");
  }
  const found = existing_(getSheet_(),attempt);
  return ContentService.createTextOutput(cb+"("+JSON.stringify({attempt_id:attempt,found})+");")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
```

**Perhatian keselamatan:** Google Apps Script awam tidak boleh menjamin kesahihan markah yang dikira oleh JavaScript klien; data boleh diubah atau dihantar oleh pihak lain. Jangan gunakan sebagai rekod peperiksaan rasmi. Nama dan kelas murid ialah data peribadi: sekolah perlu mendapat kebenaran yang sesuai dan mengehadkan akses kepada helaian. Simpan helaian dalam akaun guru/sekolah, bukan dalam repositori GitHub.

## Filter dan markah
Di Google Sheets, pilih Data > Create a filter pada tab Rekod dan tapis mengikut Kelas, Nama dan Level. Untuk markah terbaik sesuatu murid/level, gunakan `MAXIFS` pada lajur G (Skor), dengan lajur C (Student_ID) dan F (Level). Markah terkini boleh dicari dengan menyusun lajur A (Timestamp) menurun atau QUERY/SORT/FILTER.

## Ujian penerimaan
- Pastikan input kosong menghalang mula.
- Level 2/3 tidak boleh dibuka sebelum level sebelumnya lulus.
- Semak 10 jawapan per level, setiap soalan 10 markah sahaja.
- Gagal Level 1 pada 60; lulus pada 70. Gagal Level 2 pada 70; lulus pada 80.
- Level 3 pada 70 tidak memberi trofi; 80 memberi trofi.
- Ulang level dan pastikan markah terbaik tidak berkurang.
- Uji mod penerbangan: rekod belum dihantar kekal dalam peranti, kemudian hantar semula selepas sambungan dipulihkan.
- Jangan padam data pelayar sebelum rekod disahkan dan jangan gunakan mod incognito untuk kegunaan kelas.

Untuk menukar soalan atau menerbitkan perubahan, edit fail di GitHub (branch main), lakukan commit, dan GitHub Pages akan membina semula laman.
