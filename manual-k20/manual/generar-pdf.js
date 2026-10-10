const {chromium}=require('playwright');const fs=require('fs');const {execSync}=require('child_process');
const D=__dirname;const SRC=D+'/manual-k20.html';const TMP=D+'/_tmp.html';const OUT=D+'/Manual-K20-Team-Padilla.pdf';
const ids=[...Array(20)].map((_,i)=>'s'+String(i+1).padStart(2,'0'));
async function render(html,out){fs.writeFileSync(TMP,html);const b=await chromium.launch();const p=await b.newPage();
 await p.goto('file://'+TMP,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 await p.pdf({path:out,preferCSSPageSize:true,printBackground:true});await b.close()}
(async()=>{
 let html=fs.readFileSync(SRC,'utf8');
 // 1ª pasada con marcadores invisibles al inicio de cada capítulo
 let marked=html.replace(/\{\{p:s\d\d\}\}/g,'00');
 for(const id of ids)marked=marked.replace(new RegExp('(<section class="sec" id="'+id+'">\\s*<h1>)'),'$1<span style="font-size:6px;color:#fff;position:absolute">@@'+id+'@@</span>');
 await render(marked,D+'/_pass1.pdf');
 const n=+execSync(`pdfinfo ${D}/_pass1.pdf`).toString().match(/Pages:\s+(\d+)/)[1];
 const pages={};
 for(let i=1;i<=n;i++){const t=execSync(`pdftotext -f ${i} -l ${i} ${D}/_pass1.pdf -`).toString();for(const m of t.matchAll(/@@(s\d\d)@@/g))pages[m[1]]??=i}
 const miss=ids.filter(i=>!pages[i]);if(miss.length)console.log('FALTAN',miss);
 for(const id of ids)html=html.replace('{{p:'+id+'}}',String(pages[id]||'?'));
 await render(html,OUT);
 const n2=execSync(`pdfinfo ${OUT}`).toString().match(/Pages:\s+(\d+)/)[1];
 console.log('páginas:',n2,'| capítulos:',ids.map(i=>i.slice(1)+'→'+pages[i]).join(' '));
 fs.unlinkSync(TMP);fs.unlinkSync(D+'/_pass1.pdf');
})();
