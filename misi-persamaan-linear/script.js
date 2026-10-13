"use strict";
const GOOGLE_SCRIPT_URL="MASUKKAN_URL_WEB_APP_DI_SINI";
const KEY="hajix-misi-linear-state",PENDING="hajix-misi-linear-queue";
const LEVELS=[{name:"MUDAH",pass:80,award:"🥉 Lencana Gangsa — Peneroka Persamaan"},{name:"SEDERHANA",pass:70,award:"🥈 Lencana Perak — Pakar Persamaan"},{name:"SUKAR",pass:50,award:"🏆 Trofi Emas — Juara Persamaan Linear"}];
const BANK=[
[
["Apakah pemboleh ubah?",["Nilai yang sentiasa sifar","Huruf yang mewakili nilai yang boleh berubah","Simbol tambah","Nombor tetap"],1,"Huruf seperti x mewakili nilai yang belum diketahui."],
["Pilih persamaan linear satu pemboleh ubah.",["x²=9","x+y=5","x+4=9","3+5=8"],2,"Hanya satu pemboleh ubah, berkuasa satu."],
["x+6=14. Nilai x?",["6","7","8","9"],2,"x=14−6=8."],
["y−5=9. Nilai y?",["4","14","−14","10"],1,"y=9+5=14."],
["3a=21. Nilai a?",["6","7","8","9"],1,"a=21÷3=7."],
["p÷4=5. Nilai p?",["1","9","16","20"],3,"p=5×4=20."],
["Jika x=3, adakah x+5=8 benar?",["Ya","Tidak","Tidak boleh ditentukan","Hanya apabila x=5"],0,"3+5=8."],
["Persamaan bagi nombor ditambah 7 menjadi 12 ialah ...",["x−7=12","7x=12","x+7=12","x÷7=12"],2,"Ditambah 7 bermaksud x+7."],
["m−8=2. Nilai m?",["6","10","−6","16"],1,"m=2+8=10."],
["5n=40. Nilai n?",["5","6","7","8"],3,"n=40÷5=8."]
],[
["2x+3=13. Nilai x?",["4","5","6","8"],1,"2x=10, x=5."],
["3y−4=11. Nilai y?",["3","4","5","7"],2,"3y=15, y=5."],
["4a+7=−5. Nilai a?",["−3","3","−2","2"],0,"4a=−12, a=−3."],
["−2p+5=13. Nilai p?",["−9","9","−4","4"],2,"−2p=8, p=−4."],
["5x−2=3x+8. Nilai x?",["3","4","5","6"],2,"2x=10, x=5."],
["7m+1=4m+16. Nilai m?",["3","5","7","15"],1,"3m=15, m=5."],
["x÷3+2=6. Nilai x?",["8","10","12","18"],2,"x÷3=4, x=12."],
["6−2k=14. Nilai k?",["−4","4","−10","10"],0,"−2k=8, k=−4."],
["Operasi songsang untuk x−9=15 ialah ...",["Tolak 9","Darab 9","Bahagi 9","Tambah 9"],3,"Tambah 9 pada kedua-dua belah."],
["4t+2=2t−8. Nilai t?",["−5","5","−3","3"],0,"2t=−10, t=−5."]
],[
["3(x+2)=21. Nilai x?",["3","5","7","9"],1,"3x+6=21, x=5."],
["2(2x−3)+4=18. Nilai x?",["4","5","6","8"],1,"4x−2=18, x=5."],
["5(x−2)=3x+8. Nilai x?",["6","7","8","9"],3,"2x=18, x=9."],
["(x+5)÷2=9. Nilai x?",["13","14","18","23"],0,"x+5=18, x=13."],
["Dua kali nombor ditambah 7 ialah 25. Nombor itu?",["7","8","9","10"],2,"2x+7=25, x=9."],
["Ali 3 tahun lebih tua daripada Abu. Jumlah umur 25 tahun. Umur Abu?",["10","11","12","14"],1,"x+(x+3)=25, x=11."],
["Harga 3 buku sama ditambah caj RM4 ialah RM25. Harga sebuah?",["RM5","RM6","RM7","RM8"],2,"3x+4=25, x=7."],
["Perimeter segi empat tepat 36 cm. Panjang x+4 cm dan lebar x cm. Nilai x?",["5","6","7","9"],2,"2(x+4)+2x=36, x=7."],
["4(x−1)−2(x+3)=10. Nilai x?",["8","9","10","11"],2,"2x−10=10, x=10."],
["RM50 berbaki RM18 selepas membeli dua tiket sama harga. Harga satu tiket?",["RM12","RM14","RM16","RM18"],2,"50−2x=18, x=16."]
]];
const $=id=>document.getElementById(id);
const uid=()=>typeof crypto!=="undefined"&&crypto.randomUUID?crypto.randomUUID():"m"+Date.now()+Math.random().toString(36).slice(2);
const fresh=()=>({name:"",kelas:"",studentId:"",best:[0,0,0],passed:[false,false,false],attempts:[]});
let state=fresh(),game=null,busy=false;
try{let s=JSON.parse(localStorage.getItem(KEY));if(s&&Array.isArray(s.best)&&Array.isArray(s.passed))state=s}catch(e){}
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const queue=()=>{try{return JSON.parse(localStorage.getItem(PENDING))||[]}catch(e){return[]}};
const saveQueue=q=>localStorage.setItem(PENDING,JSON.stringify(q));
function page(id){["welcome","map","quiz","result"].forEach(x=>$(x).hidden=x!==id)}
function hub(){page("map");$("player").textContent="👋 "+state.name+" · "+state.kelas;$("levels").replaceChildren();LEVELS.forEach((lv,i)=>{let locked=i>0&&!state.passed[i-1],card=document.createElement("article");card.className="level";let h=document.createElement("h3");h.textContent=(locked?"🔒 ":state.passed[i]?"✅ ":"🚀 ")+"Level "+(i+1)+" · "+lv.name;let p=document.createElement("p");p.textContent="Sasaran "+lv.pass+"/100 · Terbaik "+state.best[i]+"/100";let b=document.createElement("button");b.textContent=locked?"Terkunci":state.passed[i]?"Main semula":"Mulakan";b.disabled=locked;b.onclick=()=>start(i);card.append(h,p,b);$("levels").append(card)});queueStatus()}
function shuffle(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function start(level){if(level>0&&!state.passed[level-1])return;game={level,index:0,score:0,selected:null,checked:false,order:shuffle([...Array(10).keys()]),time:Date.now()};render();page("quiz")}
function render(){let q=BANK[game.level][game.order[game.index]];game.selected=null;game.checked=false;$("number").textContent="Level "+(game.level+1)+" · Soalan "+(game.index+1)+"/10";$("score").textContent=game.score+"/100";$("progress").value=game.index;$("question").textContent=q[0];$("choices").replaceChildren();q[1].forEach((a,j)=>{let b=document.createElement("button");b.className="choice";b.textContent="ABCD"[j]+". "+a;b.onclick=()=>{if(game.checked)return;game.selected=j;[...$("choices").children].forEach((x,k)=>x.classList.toggle("selected",k===j));$("check").disabled=false};$("choices").append(b)});$("feedback").hidden=true;$("check").hidden=false;$("check").disabled=true;$("next").hidden=true}
$("check").onclick=()=>{if(!game||game.checked||game.selected===null)return;let q=BANK[game.level][game.order[game.index]],correct=game.selected===q[2];game.checked=true;if(correct)game.score+=10;$("score").textContent=game.score+"/100";[...$("choices").children].forEach((b,j)=>{b.disabled=true;b.classList.toggle("correct",correct&&j===q[2]);b.classList.toggle("incorrect",j===game.selected&&!correct)});$("feedback").textContent=correct?"✅ Betul! Tahniah!":"❌ Jawapan belum tepat. Cuba lagi dalam percubaan seterusnya.";$("feedback").hidden=false;$("check").hidden=true;$("next").hidden=false;$("next").textContent=game.index===9?"Lihat keputusan →":"Soalan seterusnya →";$("progress").value=game.index+1};
$("next").onclick=()=>{if(!game||!game.checked)return;if(game.index===9)finish();else{game.index++;render()}};
function finish(){let l=game.level,pass=game.score>=LEVELS[l].pass;state.best[l]=Math.max(state.best[l],game.score);if(pass)state.passed[l]=true;let a={Timestamp:new Date().toISOString(),Attempt_ID:uid(),Student_ID:state.studentId,Nama:state.name,Kelas:state.kelas,Bab:"Bab 6: Persamaan Linear",Level:"Level "+(l+1)+" "+LEVELS[l].name,Skor:game.score,Betul:game.score/10,Status:pass?"LULUS":"GAGAL",Markah_Terbaik:state.best[l],Masa_Saat:Math.max(1,Math.round((Date.now()-game.time)/1000))};state.attempts.push(a);save();let q=queue();q.push(a);saveQueue(q);page("result");$("outcome").replaceChildren();let h=document.createElement("h2");h.textContent="Keputusan Level "+(l+1);let p=document.createElement("p");p.textContent="Skor terkini: "+game.score+"/100 · Terbaik: "+state.best[l]+"/100 · Betul: "+game.score/10+"/10";let award=document.createElement("p");award.className="award";award.textContent=pass?"🌟 ⭐ 🌟 "+LEVELS[l].award:l===2?"Anda sudah menyelesaikan ketiga-tiga level. Cuba capai 50/100 untuk Trofi Emas.":"Belum lulus. Cuba lagi!";$("outcome").append(h,p,award);game=null;send($("sent"))}
function configured(){return /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec/.test(GOOGLE_SCRIPT_URL)}
function verify(attempt){return new Promise(resolve=>{let key="ack"+Math.random().toString(36).slice(2),tag=document.createElement("script"),timer=setTimeout(()=>cleanup(false),12000);function cleanup(ok){clearTimeout(timer);delete window[key];tag.remove();resolve(ok)}window[key]=r=>cleanup(r&&r.found===true&&r.attempt_id===attempt);tag.onerror=()=>cleanup(false);tag.src=GOOGLE_SCRIPT_URL+"?action=check&attempt_id="+encodeURIComponent(attempt)+"&callback="+key;document.head.append(tag)})}
async function send(target){if(busy)return;let items=queue();if(!items.length){target.textContent="Tiada rekod tertunggak.";queueStatus();return}if(!configured()){target.textContent="⚠️ Google Sheets belum disambungkan. Rekod tersimpan pada peranti.";queueStatus();return}busy=true;target.textContent="Menghantar dan meminta pengesahan pelayan...";let ok=0;for(let a of items){try{await fetch(GOOGLE_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(a)});if(!await verify(a.Attempt_ID))break;saveQueue(queue().filter(x=>x.Attempt_ID!==a.Attempt_ID));ok++}catch(e){break}}busy=false;target.textContent=(ok?"✅ "+ok+" rekod disahkan. ":"")+(queue().length?"⚠️ "+queue().length+" rekod menunggu pengesahan.":"Semua rekod disahkan.");queueStatus()}
function queueStatus(){$("queue").textContent=queue().length+" rekod penghantaran belum disahkan.";$("resend").disabled=!queue().length}
$("resend").onclick=()=>send($("queue"));$("home").onclick=hub;$("change").onclick=()=>{if(!confirm("Tukar murid? Rekod belum dihantar akan dikekalkan."))return;state=fresh();save();page("welcome")};
$("join").onsubmit=e=>{e.preventDefault();let name=$("nama").value.trim(),kelas=$("kelas").value.trim();if(!name||!kelas)return;state={...fresh(),name,kelas,studentId:uid()};save();hub()};
if(state.name&&state.kelas)hub();else page("welcome");