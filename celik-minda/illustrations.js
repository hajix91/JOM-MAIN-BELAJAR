/* Ilustrasi SVG ringkas, dilukis untuk latihan ini; tiada muat turun imej. */
(() => {
  const drawings = {
    baju: '<path fill="#76b9dc" d="M43 23 27 29 10 50 28 65 39 53v49h52V53l11 12 18-15-17-21-16-6q-21 19-44 0Z"/><path d="M44 24q21 23 42 0" fill="none"/>',
    bola: '<circle cx="65" cy="63" r="40" fill="#f7b864"/><path d="M35 31q45 23 57 67M25 63h80M53 24q-17 48 1 78" fill="none"/>',
    buku: '<path d="M15 30q24-11 50 3 26-14 50-3v66q-24-11-50 3-26-14-50-3Z" fill="#8ccab5"/><path d="M65 33v66M26 46h24M26 58h24M79 46h24M79 58h24" fill="none"/>',
    kaki: '<path d="M51 17h27l-4 51q5 9 18 13 13 3 11 16-5 12-38 5L41 86Z" fill="#e9b28b"/><path d="M66 89q20 10 30 5" fill="none"/>',
    susu: '<path d="m43 15 37 0 13 19v71H32V34Z" fill="#fff"/><path d="m43 15 12 19h38M55 34v71" fill="none"/><path d="M34 53h59v29H34Z" fill="#8fc6e4"/>',
    daun: '<path d="M23 89Q14 20 108 17q3 93-85 72Z" fill="#84b789"/><path d="m17 101 78-61M51 73 45 42M67 59l29 8" fill="none"/>',
    lori: '<path d="M12 34h66v51H12Z" fill="#f1bc67"/><path d="M78 47h24l17 24v14H78Z" fill="#82bcd7"/><path d="M88 54h12l12 17H88Z" fill="#e8f4f6"/><circle cx="35" cy="89" r="13" fill="#3b4f59"/><circle cx="100" cy="89" r="13" fill="#3b4f59"/>',
    gitar: '<path d="m62 49 17-33 10 5-15 35q23 11 14 37-8 26-38 15-24-9-17-30 5-16 29-29Z" fill="#d8985e"/><circle cx="63" cy="73" r="10" fill="#594438"/><path d="m56 97 27-73" fill="none"/>',
    wisel: '<path d="M21 45h34l10-10h47v23H72q4 43-28 43-30-1-23-32Z" fill="#96aeba"/><path d="M70 35v23M82 35v23" fill="none"/><circle cx="44" cy="69" r="9" fill="#e6edf0"/>',
    batu: '<path d="m16 83 10-34 23-18 30 5 29 22 9 24-24 19H39Z" fill="#9aa7ad"/><path d="m27 50 30 18 21-30M57 68 45 98M57 68l48-9" fill="none"/>',
    ibu: '<path d="M22 108q0-34 43-39 43 5 43 39Z" fill="#ae96cb"/><path d="M32 61Q24 12 65 12t33 49l-12 25H44Z" fill="#cbb6df"/><ellipse cx="65" cy="48" rx="21" ry="27" fill="#efbf98"/><circle cx="57" cy="46" r="2"/><circle cx="73" cy="46" r="2"/><path d="M57 60q8 7 16 0" fill="none"/>',
    ayah: '<path d="M23 108q0-34 42-38 42 4 42 38Z" fill="#83aac2"/><ellipse cx="65" cy="45" rx="25" ry="29" fill="#efbf98"/><path d="M40 32q-5-28 25-23 28-5 25 24-29-2-34-13Z" fill="#424444"/><circle cx="56" cy="43" r="2"/><circle cx="74" cy="43" r="2"/><path d="M58 60q7 5 14 0" fill="none"/>',
    mata: '<path d="M12 63q53-57 106 0-53 57-106 0Z" fill="#fff"/><circle cx="65" cy="63" r="23" fill="#82ad99"/><circle cx="65" cy="63" r="10" fill="#334841"/><circle cx="70" cy="57" r="4" fill="#fff"/>',
    tangan: '<path d="M43 106 25 70q-8-18 3-20 6-1 16 13V27q0-14 10-12 6 1 6 11V18q0-11 9-10 7 1 7 12v9q0-13 8-12 7 1 7 13v15q0-12 8-10 6 2 5 13l-2 32-12 26Z" fill="#e9b28b"/>',
    pisang: '<path d="M26 25q15 72 80 35-13 48-53 34-42-15-31-59Z" fill="#f3ce56"/><path d="M33 40q12 45 60 31M23 25l8-5" fill="none"/>',
    cat: '<path d="M37 50 30 16 54 36q13-5 24 0l23-20-4 34q10 33-31 35-39-1-29-35Z" fill="#d5a471"/><path d="M44 85q-12 29 22 29 34 0 22-29M91 104q35-5 22-28" fill="#d5a471"/><circle cx="51" cy="56" r="3"/><circle cx="81" cy="56" r="3"/><path d="m62 66 5 4 5-4M43 68l-23-6M44 75l-25 2M87 68l23-6M87 75l25 2" fill="none"/>',
    nose: '<path d="M57 16q5 32-11 53-20 29 5 33 14 14 30-1 28-1 7-28L76 16" fill="#e9b28b"/><path d="M47 93q6-9 13 0M76 93q6-9 13 0" fill="none"/>',
    ear: '<path d="M43 42q-1-29 27-29 38 0 35 39-2 25-25 34-5 3-7 14-4 20-20 12-17-8-10-29Z" fill="#e9b28b"/><path d="M54 42q8-22 25-11 23 19-5 36M56 55q19-7 18 11L61 83" fill="none"/>',
    nasi: '<ellipse cx="65" cy="87" rx="53" ry="20" fill="#a4c6d8"/><path d="M28 80q0-48 37-48 38 0 39 48Z" fill="#fff"/><path d="m43 58 4 3m12-10 4 3m11 10 4 3m-19 7 4 3m24-3 4 3" fill="none"/>',
    kuda: '<path d="M30 49h50l2-28 16-7 19 28-16 8-9 24-9 7v29H72V83H49v27H37V82l-7-8Z" fill="#c09367"/><path d="m83 22 1-14 12 7M30 51q-24-2-20 28" fill="none"/><circle cx="99" cy="30" r="2"/>',
    burung: '<path d="M31 76q-9-47 20-53 24-5 35 16l26 5-25 13q-5 48-49 36L16 94Z" fill="#90bad3"/><path d="M38 62q36-22 39 15M49 94l-4 15M67 94l4 15" fill="none"/><circle cx="69" cy="36" r="3"/>',
    ikan: '<path d="M27 64q34-50 75 0-41 50-75 0L9 86V42Z" fill="#89bfd5"/><circle cx="85" cy="60" r="3"/><path d="M73 43q-11 21 0 42M52 43l8-20 17 15" fill="none"/>',
    rama: '<path d="M62 53Q17 7 13 45 8 70 42 69 5 88 25 108 44 121 62 75M68 53q45-46 49-8 5 25-29 24 37 19 17 39-19 13-37-33Z" fill="#d7a1ca"/><path d="M65 46v44m0-44-12-14m12 14 12-14" fill="none"/>',
    kerusi: '<path d="M36 17h55v50H36Z" fill="#d9a77c"/><path d="M24 68h78v16H24Z" fill="#e7bb91"/><path d="M28 84v26M98 84v26M39 66v-6M88 66v-6" fill="none"/>',
    bunga: '<path d="M65 58v53m0-19q-30-29-30-10 0 19 30 15m0-7q30-28 30-9 0 20-30 16" fill="#8bb98d"/><g fill="#e6a1a6"><ellipse cx="65" cy="26" rx="12" ry="18"/><ellipse cx="88" cy="43" rx="18" ry="12"/><ellipse cx="42" cy="43" rx="18" ry="12"/><ellipse cx="51" cy="65" rx="12" ry="18"/><ellipse cx="80" cy="65" rx="12" ry="18"/></g><circle cx="65" cy="45" r="15" fill="#f2cc6c"/>',
    sudu: '<ellipse cx="65" cy="33" rx="22" ry="26" fill="#b6c5cc"/><path d="M59 59h12v47q-6 12-12 0Z" fill="#b6c5cc"/>',
    akar: '<path d="M65 10v43M65 53 27 83l-9 24M65 53l36 29 11 23M65 60v49M44 70l4 24M85 70l-2 34" fill="none" stroke="#947559"/><path d="M18 40h94" fill="none" stroke-dasharray="5 5"/>',
    apple: '<path d="M65 37q-30-17-43 11-11 33 24 59 13 8 19 0 7 8 20 0 35-26 23-59-13-28-43-11Z" fill="#d96161"/><path d="M65 39q-5-18 8-29" fill="none"/><path d="M73 25q9-22 28-11-8 19-28 11Z" fill="#8fb888"/>',
    triangle: '<path d="M65 16 115 103H15Z" fill="#eab763"/>',
    dadu: '<rect x="25" y="22" width="80" height="80" rx="12" fill="#fff"/><g fill="#3c514e"><circle cx="44" cy="42" r="6"/><circle cx="85" cy="42" r="6"/><circle cx="65" cy="62" r="6"/><circle cx="44" cy="82" r="6"/><circle cx="85" cy="82" r="6"/></g>',
    paku: '<path d="M30 19h70v13H72v63l-7 16-7-16V32H30Z" fill="#a5b9c4"/>',
    telefon: '<rect x="38" y="10" width="54" height="103" rx="10" fill="#527674"/><rect x="44" y="22" width="42" height="72" rx="3" fill="#bfdddd"/><circle cx="65" cy="103" r="3" fill="#fff"/>',
    pokok: '<path d="M56 60h18v53H56Z" fill="#bc906a"/><path d="M38 72Q9 71 22 47q-6-20 19-25 4-26 27-14 22-9 28 17 24 4 17 29 9 26-25 21Z" fill="#8bb78b"/>',
    komputer: '<rect x="15" y="17" width="100" height="66" rx="5" fill="#587574"/><rect x="22" y="24" width="86" height="49" fill="#bde1e3"/><path d="M57 83h16v17H57Z" fill="#a0b4b4"/><path d="M40 103h51M20 116h91" fill="none"/>',
    rumah: '<path d="M23 54h84v57H23Z" fill="#f1d89a"/><path d="m12 57 53-43 53 43Z" fill="#d98773"/><path d="M55 75h23v36H55Z" fill="#ac987b"/><path d="M33 69h15v16H33M85 69h15v16H85" fill="#b5d6e0"/>',
    kereta: '<path d="m30 57 17-25h38l17 25 18 10v26H10V67Z" fill="#87b4d0"/><path d="m46 54 8-16h25l12 16Z" fill="#e4f1f2"/><circle cx="32" cy="95" r="13" fill="#445959"/><circle cx="98" cy="95" r="13" fill="#445959"/>',
    shoes: '<path d="M10 35h26v17l20 10q18 0 18 18H10Z" fill="#729aab"/><path d="M56 83h24v13l24 5q20 0 19 17H56Z" fill="#729aab"/><path d="M10 80h64M56 118h67M38 60l-5 6M46 63l-5 6M83 98l-4 7M94 100l-4 8" fill="none"/>',
    cup: '<path d="M27 30h65v66q-32 25-65 0Z" fill="#88b8db"/><path d="M92 42q38-3 26 31-5 16-26 9" fill="none"/>',
    cupoutline: '<path class="cup-fill" d="M27 30h65v66q-32 25-65 0Z" fill="#fff"/><path d="M92 42q38-3 26 31-5 16-26 9" fill="none"/>',
    roti: '<path d="M31 51q-21-22 0-35 31-17 68 1 18 14-1 34v56H31Z" fill="#dba976"/><path d="M40 50q-17-18 0-26 25-13 50 1 14 10-1 25v46H40Z" fill="#f3d8a7"/>',
    syiling: '<circle cx="65" cy="62" r="44" fill="#c4ccd0"/><circle cx="65" cy="62" r="35" fill="none"/><path d="M50 69q15-29 28-9" fill="none"/>',
    jam: '<circle cx="65" cy="62" r="47" fill="#fff"/><circle cx="65" cy="62" r="4" fill="#48615a"/><path d="M65 26v36l24 13" fill="none"/>',
    jam8: '<circle cx="65" cy="62" r="47" fill="#fff"/><g fill="#40554e" stroke="none" font-family="system-ui" font-size="14" text-anchor="middle"><text x="65" y="32">12</text><text x="99" y="68">3</text><text x="65" y="102">6</text><text x="30" y="68">9</text></g><path d="M65 33v29L44 75" fill="none" stroke-width="5"/><circle cx="65" cy="62" r="4" fill="#48615a"/>'
  };
  drawings.meja = '<path d="M15 40h100v15H15Z" fill="#dbb089"/><path d="M25 55v52M105 55v52" stroke-width="9" fill="none"/>';
  drawings.gigi = '<path d="M29 34q0-25 21-21 15 9 30 0 22-4 22 21-1 19-9 29-1 45-14 47-11 0-10-37-5-12-10 0 1 37-10 37-13-2-14-47Z" fill="#fff"/>';
  drawings.threeballs = '<g fill="#e5b66e"><circle cx="26" cy="62" r="18"/><circle cx="65" cy="62" r="18"/><circle cx="104" cy="62" r="18"/></g>';
  for (const [name,colour] of Object.entries({red:'#d96161',blue:'#4c90d3',yellow:'#efcd4e'})) drawings[name] = `<circle cx="65" cy="62" r="38" fill="${colour}"/>`;
  window.CELIK_PICTURES = drawings;
  window.celikPicture = (key) => `<svg viewBox="0 0 130 125" role="img" aria-label="${({cat:'kucing',nose:'hidung',ear:'telinga',rama:'rama-rama',apple:'epal',triangle:'segi tiga',threeballs:'tiga bola',shoes:'sepasang kasut',cup:'cawan',cupoutline:'cawan',jam8:'jam analog',red:'merah',blue:'biru',yellow:'kuning'}[key] || key)}" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#40554e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${drawings[key] || ''}</svg>`;
})();
