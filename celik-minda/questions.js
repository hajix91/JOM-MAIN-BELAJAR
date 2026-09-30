/* Set latihan baharu; bukan kertas rasmi atau salinan soalan PASTI. */
(() => {
  const opt = (label, value = label, pic) => ({label, value, pic});
  const text = (prompt, answer, marks = 2, extra = {}) => ({type:'text', prompt, answer, marks, ...extra});
  const choice = (prompt, answer, options, marks = 2, extra = {}) => ({type:'choice', prompt, answer, options:options.map(o => typeof o === 'string' ? opt(o) : o), marks, ...extra});
  const multi = (prompt, answer, options, marks, extra = {}) => ({type:'multi', prompt, answer, options:options.map(o => typeof o === 'string' ? opt(o) : o), marks, ...extra});
  const page = (subject, title, fields, bank = []) => ({subject, title, fields, bank});
  const bm = 'Bahasa Melayu', ar = 'Bahasa Arab', en = 'Bahasa Inggeris', jw = 'Jawi', ma = 'Matematik', sc = 'Sains & Teknologi';
  const pics = (...keys) => keys.map(k => opt('',k,k));
  const yn = (prompt, answer, extra = {}) => choice(prompt,answer,['Ya','Tidak'],1,extra);
  const wordPic = (pic, answer, options, extra = {}) => choice('Pilih perkataan yang betul.',answer,options,2,{pic,...extra});
  const jawiPics = (words, keys) => words.map((word,i) => choice(word,keys[i],pics(...[2,0,4,1,3].map(n=>keys[n])),2,{rtl:true}));
  const sets = {
    5: [
      page(bm,'1. Isikan huruf yang tertinggal.',[
        ...[['a __ c','b'],['d __ f','e'],['g __ i','h'],['j __ l','k'],['m __ o','n'],['p __ r','q'],['s __ u','t'],['v __ x','w'],['x __ z','y'],['A __ C','B']].map(([p,a])=>text(p,a,1,{caseSensitive:true,short:true}))
      ]),
      page(bm,'2. Isikan suku kata awal yang betul.',[
        ...[['__ju','ba','baju'],['__la','bo','bola'],['__ku','bu','buku'],['__ki','ka','kaki'],['__su','su','susu']].map(([p,a,pic])=>text(p,a,2,{pic,short:true}))
      ],['ba','bo','bu','ka','su']),
      page(bm,'3. Tandakan perkataan yang betul.',[
        wordPic('daun','daun',['daun','dahi']),wordPic('lori','lori',['lori','van']),wordPic('gitar','gitar',['jarum','gitar']),wordPic('wisel','wisel',['siput','wisel']),wordPic('batu','batu',['batu','baju'])
      ]),
      page(bm,'4. Lengkapkan ayat.',[
        text('Adik makan ____.','nasi'),text('Ali pergi ke ____.','sekolah'),text('Baju Siti berwarna ____.','merah'),text('Amir bermain ____.','bola'),text('Kakak membaca ____.','buku')
      ],['nasi','sekolah','merah','bola','buku']),
      page(ar,'5. Padankan kalimah dengan gambar. Pilih satu gambar bagi setiap kalimah.',[
        ...['أُمٌّ','أَبٌ','عَيْنٌ','يَدٌ','مَوْزٌ'].map((w,i)=>choice(w,['ibu','ayah','mata','tangan','pisang'][i],pics('mata','pisang','ayah','tangan','ibu'),2,{rtl:true}))
      ]),
      page(en,'6. Tick the correct word.',[
        wordPic('cat','cat',['cat','cup']),wordPic('nose','nose',['nose','mouth']),wordPic('buku','book',['book','ball']),wordPic('pisang','banana',['banana','apple']),wordPic('ear','ear',['eye','ear'])
      ]),
      page(jw,'7. Pilih perkataan Jawi yang sama.',[
        choice('بولا','بولا',['بولا','باجو','بوکو'],2,{rtl:true}),choice('سوسو','سوسو',['ناسي','سوسو','سودو'],2,{rtl:true}),choice('کودا','کودا',['کودا','کاکي','دادو'],2,{rtl:true}),choice('روتي','روتي',['تالي','روتي','ناسي'],2,{rtl:true}),choice('سودو','سودو',['ساکو','سودو','ڤاکو'],2,{rtl:true})
      ]),
      page(jw,'8. Padankan perkataan Jawi dengan gambar.',jawiPics(['بولا','باجو','سوسو','ناسي','کودا'],['bola','baju','susu','nasi','kuda'])),
      page(ma,'9. Selesaikan soalan di bawah.',[
        text('7 + 2 = ____','9'),text('10 − 3 = ____','7'),text('4, 5, ____, 7','6'),choice('Pilih nombor yang lebih besar.','8',['8','5']),text('6 + 4 = ____','10')
      ]),
      page(sc,'10. Perhatikan dan kelaskan.',[
        yn('Adakah haiwan ini boleh terbang?','Ya',{pic:'burung',group:'a. Haiwan yang boleh terbang.'}),yn('Adakah haiwan ini boleh terbang?','Tidak',{pic:'ikan'}),yn('Adakah haiwan ini boleh terbang?','Ya',{pic:'rama'}),yn('Adakah haiwan ini boleh terbang?','Tidak',{pic:'cat'}),
        choice('Pilih objek ciptaan manusia.','kerusi',pics('kerusi','bunga'),1,{group:'b. Objek ciptaan manusia.'}),choice('Pilih objek ciptaan manusia.','buku',pics('batu','buku'),1),choice('Pilih objek ciptaan manusia.','sudu',pics('sudu','daun'),1),
        choice('Apakah bahagian tumbuhan ini?','akar',['akar','daun','buah'],1,{pic:'akar',group:'c. Bahagian tumbuhan.'}),choice('Apakah bahagian tumbuhan ini?','daun',['buah','akar','daun'],1,{pic:'daun'}),choice('Apakah bahagian tumbuhan ini?','buah',['daun','buah','akar'],1,{pic:'apple'})
      ])
    ],
    6: [
      page(bm,'1. Padankan huruf kecil dengan huruf besar.',
        ['a','c','f','h','k','m','p','r','t','y'].map(l=>choice(l,l.toUpperCase(),['K','Y','A','T','F','M','C','R','P','H'],1,{select:true,caseSensitive:true}))),
      page(bm,'2. Kelaskan huruf vokal dan konsonan.',
        ['a','b','e','g','i','k','o','s','u','t'].map(l=>choice(l,'aeiou'.includes(l)?'Vokal':'Konsonan',['Vokal','Konsonan'],1))),
      page(bm,'3. Gabungkan suku kata.',
        [['ba + ju','baju'],['bu + ku','buku'],['da + du','dadu'],['ku + da','kuda'],['ro + ti','roti']].map(([p,a])=>text(p+' = ____',a))),
      page(bm,'4. Isikan tempat kosong.',[
        text('Itu ____ saya.','ibu',2,{pic:'ibu'}),text('Ayah membeli ____ baru.','kereta',2,{pic:'kereta'}),text('Adik makan ____.','ikan'),text('Buku ada di atas ____.','meja'),text('Badan gajah ____.','besar')
      ],['ikan','besar','kereta','meja','ibu']),
      page(ar,'5. Padankan kalimah dengan maksud yang betul.',[
        ...['أَحْمَرُ','أَصْفَرُ','عَيْنٌ','أُذُنٌ','أَخٌ'].map((w,i)=>choice(w,['merah','kuning','mata','telinga','abang/adik lelaki'][i],['mata','abang/adik lelaki','kuning','telinga','merah'],2,{rtl:true,select:true}))
      ]),
      page(en,'6. Tick the correct answer.',[
        choice('8','eight',['six','eight']),choice('How many balls?','three',['three','five'],2,{pic:'threeballs'}),choice('What colour is the apple?','red',['red','blue'],2,{pic:'apple'}),wordPic('triangle','triangle',['circle','triangle']),wordPic('tangan','hand',['hand','leg'])
      ]),
      page(jw,'7. Pilih perkataan Jawi berdasarkan gambar.',[
        wordPic('susu','سوسو',['سوسو','سودو'],{rtlOptions:true}),wordPic('nasi','ناسي',['ناسي','تالي'],{rtlOptions:true}),wordPic('bola','بولا',['بولا','کودا'],{rtlOptions:true}),wordPic('dadu','دادو',['دادو','باجو'],{rtlOptions:true}),wordPic('paku','ڤاکو',['ڤاکو','ساکو'],{rtlOptions:true})
      ]),
      page(jw,'8. Padankan perkataan Jawi dengan maksud yang betul.',[
        ...['ايکن','کاکي','تالي','جم','روتي'].map((w,i)=>choice(w,['ikan','kaki','tali','jam','roti'][i],['jam','tali','roti','ikan','kaki'],2,{rtl:true,select:true}))
      ]),
      page(ma,'9. Selesaikan soalan di bawah.',[
        text('5 + 4 = ____','9'),text('9 − 2 = ____','7'),text('11, 12, ____, 14','13'),text('Susun menaik: 8, 2, 5','2,5,8',2,{sequence:true,hint:'Pisahkan nombor dengan koma. Contoh: 1, 2, 3.'}),text('Susun menurun: 4, 9, 6','9,6,4',2,{sequence:true,hint:'Pisahkan nombor dengan koma.'})
      ]),
      page(sc,'10. Padankan deria dan kenal pasti alat teknologi.',[
        choice('Mata digunakan untuk ____.','melihat',['menghidu','mendengar','melihat'],2,{pic:'mata',group:'a. Anggota badan dan deria.'}),choice('Hidung digunakan untuk ____.','menghidu',['melihat','menghidu','mendengar'],2,{pic:'nose'}),choice('Telinga digunakan untuk ____.','mendengar',['mendengar','melihat','menghidu'],2,{pic:'ear'}),
        choice('Pilih alat teknologi.','telefon',pics('telefon','pokok'),2,{group:'b. Alat teknologi.'}),choice('Pilih alat teknologi.','komputer',pics('batu','komputer'),2)
      ])
    ],
    7: [
      page(bm,'1. Lengkapkan perkataan dengan huruf vokal.',
        [['b _ ku','u'],['b _ la','o'],['k _ da','u'],['s _ su','u'],['n _ si','a'],['r _ ti','o'],['b _ ju','a'],['g _ gi','i'],['k _ ki','a'],['m _ ja','e']].map(([p,a],i)=>text(p,a,1,{short:true,pic:['buku','bola','kuda','susu','nasi','roti','baju','gigi','kaki','meja'][i]})),['a','e','i','o','u']),
      page(bm,'2. Padankan perkataan dengan gambar.',
        ['rumah','pokok','bunga','bola','kereta'].map(w=>choice(w,w,pics('bola','rumah','kereta','bunga','pokok')))),
      page(bm,'3. Susun suku kata menjadi perkataan.',
        [['mah + ru','rumah'],['ju + ba','baju'],['li + ci','cili'],['si + na','nasi'],['ku + bu','buku']].map(([p,a])=>text(p+' = ____',a))),
      page(bm,'4. Pilih perkataan yang betul.',[
        choice('Ini ____ Ali.','rumah',['rumah','sekolah'],2,{pic:'rumah'}),choice('Ayah memandu ____.','kereta',['kereta','bola']),choice('Ibu memasak ____.','nasi',['nasi','buku']),choice('Kakak memakai ____.','baju',['baju','pokok']),choice('Adik minum ____.','susu',['susu','batu'])
      ]),
      page(ar,'5. Pilih perkataan Arab yang sama.',[
        choice('أَسَدٌ','أَسَدٌ',['أَسَدٌ','لَبَنٌ','قَلَمٌ'],2,{rtl:true}),choice('أُمٌّ','أُمٌّ',['أَبٌ','أُمٌّ','أَخٌ'],2,{rtl:true}),choice('عَيْنٌ','عَيْنٌ',['أُذُنٌ','عَيْنٌ','يَدٌ'],2,{rtl:true}),choice('مَوْزٌ','مَوْزٌ',['تُفَّاحٌ','مَوْزٌ','عِنَبٌ'],2,{rtl:true}),choice('قَلَمٌ','قَلَمٌ',['قَلَمٌ','كِتَابٌ','بَيْتٌ'],2,{rtl:true})
      ]),
      page(en,'6. Complete the activities.',[
        text('Rewrite: January','January',2,{caseSensitive:true}),choice('Circle the same word: apple','apple',['orange','apple','banana']),text('Rearrange: t a c','cat'),choice('Choose a pair of shoes.','shoes',pics('shoes','baju','cup')),choice('Colour the cup blue.','blue',[opt('','red','red'),opt('','blue','blue'),opt('','yellow','yellow')],2,{pic:'cupoutline',colourCup:true})
      ]),
      page(jw,'7. Kenal pasti huruf vokal Jawi. Pilih “Vokal” atau “Bukan vokal” bagi setiap huruf.',
        ['ا','ب','و','س','ي','ت','ا','م','و','ي'].map(w=>choice(w,['ا','و','ي'].includes(w)?'Vokal':'Bukan vokal',['Vokal','Bukan vokal'],1,{rtl:true}))),
      page(jw,'8. Padankan gambar dengan perkataan Jawi.',[
        wordPic('ikan','ايکن',['ايکن','روتي','سودو','جم','کودا'],{rtlOptions:true}),wordPic('roti','روتي',['کودا','جم','ايکن','روتي','سودو'],{rtlOptions:true}),wordPic('sudu','سودو',['روتي','سودو','کودا','ايکن','جم'],{rtlOptions:true}),wordPic('jam','جم',['جم','روتي','کودا','ايکن','سودو'],{rtlOptions:true}),wordPic('kuda','کودا',['سودو','ايکن','جم','کودا','روتي'],{rtlOptions:true})
      ]),
      page(ma,'9. Selesaikan soalan di bawah.',[
        text('8 + 5 = ____','13'),text('15 − 4 = ____','11'),text('6, 8, 10, ____, ____','12,14',2,{sequence:true,hint:'Pisahkan dua nombor dengan koma.'}),text('Jam menunjukkan pukul ____ pagi.','8',2,{pic:'jam8'}),text('20 sen + 50 sen = ____ sen','70')
      ]),
      page(sc,'10. Perhatikan sifat objek dan jenis tumbuhan.',[
        choice('Daun kering di atas air.','Timbul',['Timbul','Tenggelam'],1,{pic:'daun',group:'a. Pilih timbul atau tenggelam dalam air.'}),choice('Batu dimasukkan ke dalam air.','Tenggelam',['Timbul','Tenggelam'],1,{pic:'batu'}),choice('Bola plastik berisi udara di dalam air.','Timbul',['Timbul','Tenggelam'],1,{pic:'bola'}),choice('Syiling dimasukkan ke dalam air.','Tenggelam',['Timbul','Tenggelam'],1,{pic:'syiling'}),
        multi('Pilih semua bahan yang biasanya berbau.', ['minyak wangi','bunga'],['minyak wangi','air kosong','bunga'],3,{group:'b. Bahan yang berbau.',hint:'Pilih semua jawapan yang betul. 3 markah jika semua pilihan tepat.'}),
        multi('Pilih tiga jenis bunga.',['bunga raya','bunga matahari','bunga ros'],['bunga raya','rumput','bunga matahari','pokok kelapa','bunga ros'],3,{group:'c. Jenis bunga.',hint:'Pilih tiga jawapan. 3 markah jika semua pilihan tepat.'})
      ])
    ]
  };
  for (const [set,pages] of Object.entries(sets)) pages.forEach((p,pi)=>p.fields.forEach((f,fi)=>f.id=`s${set}-p${pi}-q${fi}`));
  window.CELIK_SETS = sets;
  window.CELIK_SUBJECTS = {[bm]:40,[ar]:10,[en]:10,[jw]:20,[ma]:10,[sc]:10};
})();
