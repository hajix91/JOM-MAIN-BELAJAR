(() => {
  'use strict';
  const sets = window.CELIK_SETS, subjects = window.CELIK_SUBJECTS;
  const root = document.getElementById('app');
  let state = {view:'home'}, storageOK = true;
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const all = set => sets[set].flatMap(p=>p.fields);
  const key = set => `jom-celik-v1-set-${set}`;
  const answered = f => Array.isArray(state.answers?.[f.id]) ? state.answers[f.id].length > 0 : String(state.answers?.[f.id] ?? '').trim().length > 0;
  function read(set) {
    try {
      const r = JSON.parse(localStorage.getItem(key(set)) || 'null');
      if (!r || r.version !== 1 || r.set !== Number(set) || !r.answers || typeof r.answers !== 'object' || Array.isArray(r.answers)) return null;
      const answers = {};
      for (const f of all(set)) {
        const a = r.answers[f.id];
        if (f.type === 'multi' && Array.isArray(a)) answers[f.id] = [...new Set(a.filter(v=>f.options.some(o=>o.value===v)))];
        else if (f.type === 'choice' && f.options.some(o=>o.value===a)) answers[f.id]=a;
        else if (f.type === 'text' && typeof a === 'string') answers[f.id]=a.slice(0,100);
      }
      return {set:Number(set),version:1,page:Math.max(0,Math.min(9,Number.isInteger(r.page)?r.page:0)),name:typeof r.name==='string'?r.name.slice(0,50):'',answers,view:r.view==='review'?'review':'paper'};
    } catch {storageOK=false;return null;}
  }
  function save() {
    if (!state.set) return;
    try {localStorage.setItem(key(state.set),JSON.stringify({...state,version:1}));}
    catch {storageOK=false;const el=document.getElementById('save-status');if(el) el.textContent='Jawapan kekal semasa halaman ini terbuka. Penyimpanan peranti tidak tersedia.';}
  }
  function normal(value,f) {
    if (f.type==='multi') return JSON.stringify([...(value || [])].sort());
    let s=String(value ?? '').trim().normalize('NFC');
    if (f.sequence) {
      if (!/^\d+(?:[\s,;]+\d+)*$/.test(s)) return s;
      return s.split(/[\s,;]+/).join(',');
    }
    return f.caseSensitive?s:s.toLowerCase();
  }
  const correct = f => normal(state.answers[f.id],f) === normal(f.answer,f);
  function grade(set,answers) {
    const result = {total:0,maximum:100,subjects:{},missing:0};
    for(const p of sets[set]) {
      result.subjects[p.subject] ??= {score:0,maximum:subjects[p.subject]};
      for(const f of p.fields) {
        const a=answers[f.id];
        if(a===undefined || (typeof a==='string'&&!a.trim()) || (Array.isArray(a)&&!a.length)) result.missing++;
        if(normal(a,f)===normal(f.answer,f)) {result.total+=f.marks;result.subjects[p.subject].score+=f.marks;}
      }
    }
    return result;
  }
  window.CELIK_GRADE = grade;
  const header = () => `<header class="masthead"><a class="brand" href="../"><span class="brand-icon">✦</span><span>Jom Main <span class="brand-light">& Belajar</span></span></a><span class="header-tag">6 TAHUN</span></header>`;
  const footer = () => `<footer>Latihan baharu berdasarkan bentuk kemahiran dalam rujukan PASTI. Bukan kertas rasmi PASTI.<br>Jawapan disimpan pada pelayar peranti ini sahaja.</footer>`;
  function home() {
    const cards = Object.keys(sets).map(set=>{
      const draft=read(set), done=draft?.view==='review';
      const number=draft?Object.values(draft.answers).filter(v=>Array.isArray(v)?v.length:String(v).trim().length).length:0;
      return `<article class="set-card"><div class="set-top"><span class="set-number">${set}</span><span class="mini-label">SET LATIHAN</span></div><h2>Set ${set}</h2><p>10 helaian soalan · 100 markah</p><div class="mini-paper"><span></span><span></span><span></span><i>✎</i></div><p class="card-note">${done?`Selesai · ${grade(set,draft.answers).total}/100 markah`:number?`${number} jawapan telah diisi`:'Jawab mengikut susunan kertas sebenar.'}</p><button class="primary" data-action="open" data-set="${set}">${done?'Lihat keputusan':number?'Sambung set':'Mulakan set'} <span>→</span></button></article>`;
    }).join('');
    root.innerHTML=`${header()}<main class="home"><div class="eyebrow">LATIHAN CELIK MINDA</div><h1>Satu set lengkap.<br><em>Belajar dengan tenang.</em></h1><p class="intro">Pilih Set 5, 6 atau 7. Jawab helaian demi helaian seperti kertas latihan. Semakan dan markah dipaparkan selepas set dihantar.</p><div class="home-facts"><span>✎ Ruang jawapan</span><span>▤ Susunan seperti PDF</span><span>✓ Semakan selepas selesai</span></div><section class="set-grid" aria-label="Pilih set lengkap">${cards}</section><aside class="parent-note"><strong>Untuk ibu bapa</strong><p>Bantu anak memahami arahan. Masa cadangan: 1 jam bagi satu set. Soalan padanan menggunakan pilihan gambar; jawapan bertulis diisi dalam ruang yang disediakan. Latihan menulis tangan masih boleh dibuat pada kertas.</p></aside></main>${footer()}`;
  }
  function start(set,fresh=false) {
    state=(!fresh&&read(set)) || {set:Number(set),page:0,answers:{},name:'',view:'paper'};
    save();render();
  }
  function answerLabel(f,value) {
    if(Array.isArray(value)) return value.length?value.map(v=>answerLabel(f,v)).join(', '):'Belum dijawab';
    if(value===undefined||value==='') return 'Belum dijawab';
    const o=f.options?.find(o=>o.value===value);
    return o?.pic?`${window.celikPicture(o.pic)}<span class="answer-caption">${esc(value)}</span>`:esc(o?.label||value);
  }
  function field(f,i,review=false) {
    const a=state.answers[f.id];
    const picture=f.pic?`<div class="question-picture ${f.colourCup?'colourable':''}" ${f.colourCup&&a?`style="--cup-colour:${({red:'#d96161',blue:'#4c90d3',yellow:'#efcd4e'})[a]||'#fff'}"`:''}>${window.celikPicture(f.pic)}</div>`:'';
    let control='';
    if(review) {
      control=`<div class="review-answer ${correct(f)?'right':'wrong'}"><div><small>Jawapan kamu</small><div class="answer-value">${answerLabel(f,a)}</div></div><div><small>Jawapan betul</small><div class="answer-value">${answerLabel(f,f.answer)}</div></div><strong>${correct(f)?f.marks:0}/${f.marks}</strong></div>`;
    } else if(f.type==='text') {
      control=`<label class="sr-only" for="${f.id}">Jawapan soalan ${i+1}</label><input id="${f.id}" data-id="${f.id}" class="write-answer ${f.short?'short':''}" value="${esc(a||'')}" maxlength="100" autocomplete="off" autocapitalize="off" spellcheck="false" ${!f.sequence && /^\d|Jam|20 sen/.test(f.prompt)?'inputmode="numeric"':''} aria-describedby="${f.id}-prompt">`;
    } else if(f.select) {
      control=`<label class="sr-only" for="${f.id}">Jawapan soalan ${i+1}</label><select id="${f.id}" data-id="${f.id}" aria-describedby="${f.id}-prompt"><option value="">Pilih jawapan…</option>${f.options.map(o=>`<option value="${esc(o.value)}" ${a===o.value?'selected':''}>${esc(o.label)}</option>`).join('')}</select>`;
    } else {
      control=`<div class="options ${f.options.some(o=>o.pic)?'picture-options':''}" role="group" aria-labelledby="${f.id}-prompt">${f.options.map((o,oi)=>{
        const selected=f.type==='multi'?Array.isArray(a)&&a.includes(o.value):a===o.value;
        return `<label class="option ${selected?'selected':''}"><input type="${f.type==='multi'?'checkbox':'radio'}" data-id="${f.id}" name="${f.id}" value="${esc(o.value)}" ${selected?'checked':''}><span class="option-content ${f.rtlOptions||(f.rtl&&/[\u0600-\u06ff]/.test(o.label))?'arabic':''}">${o.pic?window.celikPicture(o.pic):`<bdi>${esc(o.label)}</bdi>`}</span><span class="sr-only">${o.pic?esc(({red:'red',blue:'blue',yellow:'yellow'})[o.pic]||o.pic):''}</span></label>`;
      }).join('')}</div>`;
    }
    return `${f.group?`<h3 class="group-title">${esc(f.group)}</h3>`:''}<div class="question ${review?'review-question':''}"><span class="question-number">${String.fromCharCode(97+i)}.</span><div class="question-body"><div class="question-line"><p id="${f.id}-prompt" class="prompt ${f.rtl?'arabic':''}" ${f.rtl?'dir="rtl"':''}>${esc(f.prompt)}</p><span class="marks">${f.marks} m</span></div>${f.hint?`<p class="hint">${esc(f.hint)}</p>`:''}<div class="question-work">${picture}${control}</div></div></div>`;
  }
  function paperPage(p,index,review=false) {
    const marks=p.fields.reduce((n,f)=>n+f.marks,0);
    return `<section class="paper ${review?'review-paper':''}"><div class="paper-meta"><span>SET ${state.set} · HELAIAN ${index+1} / 10</span><span>${marks} markah</span></div><h2 id="${review?'review-title-'+index:'page-title'}" tabindex="-1">${esc(p.subject)}</h2><p class="instruction">${esc(p.title)}</p>${p.bank.length?`<div class="word-bank" aria-label="Pilihan jawapan">${p.bank.map(w=>`<span>${esc(w)}</span>`).join('')}</div>`:''}<div class="question-list">${p.fields.map((f,i)=>field(f,i,review)).join('')}</div></section>`;
  }
  function paper() {
    const count=all(state.set).filter(answered).length, total=all(state.set).length;
    root.innerHTML=`${header()}<main class="workspace"><div class="workspace-top"><button class="text-button" data-action="home">← Semua set</button><span>Set ${state.set} · 100 markah</span></div><div class="paper-layout"><aside class="sidebar"><div class="sidebar-title">Kertas latihan</div><label for="student-name">Nama anak <span>(pilihan)</span></label><input id="student-name" value="${esc(state.name)}" maxlength="50" autocomplete="off"><p>Jawab semua 10 helaian. Kamu boleh semak semula sebelum hantar.</p><nav class="page-nav" aria-label="Helaian dalam set">${sets[state.set].map((p,i)=>`<button data-action="page" data-page="${i}" class="${state.page===i?'active':''}" ${state.page===i?'aria-current="page"':''}><span class="page-dot">${i+1}</span><span>${esc(p.subject)}<small>${p.fields.filter(answered).length}/${p.fields.length} dijawab</small></span></button>`).join('')}</nav><div class="save-status" id="save-status">${storageOK?'Jawapan disimpan pada peranti ini.':'Penyimpanan peranti tidak tersedia. Kekalkan halaman ini terbuka.'}</div></aside><div class="sheet-column"><div class="progress-caption"><span>Helaian ${state.page+1} daripada 10</span><span id="answer-count">${count}/${total} dijawab</span></div><div class="progress-track"><span style="width:${(state.page+1)*10}%"></span></div>${paperPage(sets[state.set][state.page],state.page)}<div class="paper-controls"><button class="secondary" data-action="prev" ${state.page===0?'disabled':''}>← Sebelumnya</button><button class="primary" data-action="${state.page===9?'submit':'next'}">${state.page===9?'Hantar set lengkap ✓':'Helaian seterusnya →'}</button></div><p class="exam-note">Markah dan jawapan betul dipaparkan selepas set dihantar.</p></div></div></main>${footer()}`;
  }
  function review() {
    const r=grade(state.set,state.answers);
    root.innerHTML=`${header()}<main class="results"><div class="workspace-top"><button class="text-button" data-action="home">← Semua set</button><span>Set ${state.set} · Keputusan</span></div><section class="result-hero"><div class="eyebrow">SET SELESAI</div><h1>${state.name?`Syabas, ${esc(state.name)}!`:'Syabas, kamu sudah selesai!'}</h1><p>Teruskan berlatih. Setiap cubaan membantu kamu belajar.</p><div class="big-score">${r.total}<span>/100</span></div><p>${r.missing?`${r.missing} soalan belum dijawab. Soalan itu mendapat 0 markah.`:'Semua soalan telah dijawab.'}</p></section><section class="score-grid" aria-label="Pecahan markah">${Object.entries(r.subjects).map(([s,v])=>`<div><span>${esc(s)}</span><strong>${v.score}<small> / ${v.maximum}</small></strong></div>`).join('')}</section><div class="result-actions"><button class="primary" data-action="retry">Cuba set ini semula</button><button class="secondary" data-action="print">Cetak keputusan & semakan</button></div><h2 class="review-heading">Semak jawapan kamu</h2>${sets[state.set].map((p,i)=>paperPage(p,i,true)).join('')}</main>${footer()}`;
  }
  function render() {if(state.view==='home')home();else if(state.view==='review')review();else paper();}
  function go(page) {state.page=Math.max(0,Math.min(9,page));save();render();document.getElementById('page-title')?.focus();window.scrollTo({top:0,behavior:'instant'});}
  function confirmDialog(title,description,accept,onAccept) {
    const dialog=document.createElement('dialog');dialog.className='confirm-dialog';
    dialog.innerHTML=`<h2>${esc(title)}</h2><p>${esc(description)}</p><div><button class="secondary" data-cancel>Kembali</button><button class="primary" data-accept>${esc(accept)}</button></div>`;
    document.body.append(dialog);dialog.showModal();
    dialog.querySelector('[data-cancel]').onclick=()=>dialog.close();
    dialog.querySelector('[data-accept]').onclick=()=>{dialog.close();onAccept();};
    dialog.addEventListener('close',()=>dialog.remove(),{once:true});
  }
  root.addEventListener('click',e=>{
    const button=e.target.closest('[data-action]');if(!button)return;
    switch(button.dataset.action) {
      case 'open':start(button.dataset.set);break;
      case 'home':save();state={view:'home'};render();window.scrollTo(0,0);break;
      case 'page':go(Number(button.dataset.page));break;
      case 'prev':go(state.page-1);break;
      case 'next':go(state.page+1);break;
      case 'submit': {
        const missing=all(state.set).filter(f=>!answered(f)).length;
        confirmDialog('Hantar set lengkap?',missing?`Masih ada ${missing} soalan belum dijawab. Soalan kosong mendapat 0 markah. Kamu boleh kembali untuk melengkapkannya.`:'Semua soalan telah dijawab. Selepas dihantar, kamu boleh melihat markah dan semakan.', 'Hantar & lihat markah',()=>{state.view='review';save();render();window.scrollTo(0,0);});break;
      }
      case 'retry':confirmDialog('Cuba set ini semula?','Jawapan dan keputusan set ini pada peranti ini akan diganti dengan cubaan baharu.','Mulakan semula',()=>{start(state.set,true);window.scrollTo(0,0);});break;
      case 'print':window.print();break;
    }
  });
  function updateAnswer(e) {
    if(state.view!=='paper')return;
    const el=e.target;
    if(el.id==='student-name') {state.name=el.value.slice(0,50);save();return;}
    const id=el.dataset.id;if(!id)return;
    const f=all(state.set).find(f=>f.id===id);if(!f)return;
    if(f.type==='multi') state.answers[id]=Array.from(root.querySelectorAll(`input[data-id="${id}"]:checked`)).map(i=>i.value);
    else state.answers[id]=el.value;
    el.closest('.options')?.querySelectorAll('.option').forEach(l=>l.classList.toggle('selected',l.querySelector('input').checked));
    if(f.colourCup) {const pic=el.closest('.question-work').querySelector('.colourable');pic?.style.setProperty('--cup-colour',({red:'#d96161',blue:'#4c90d3',yellow:'#efcd4e'})[el.value]||'#fff');}
    const n=all(state.set).filter(answered).length;
    root.querySelector('#answer-count').textContent=`${n}/${all(state.set).length} dijawab`;
    root.querySelectorAll('.page-nav button').forEach((b,i)=>{b.querySelector('small').textContent=`${sets[state.set][i].fields.filter(answered).length}/${sets[state.set][i].fields.length} dijawab`;});
    save();
  }
  root.addEventListener('input',updateAnswer);
  root.addEventListener('change',updateAnswer);
  render();
})();
