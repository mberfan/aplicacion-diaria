const {chromium}=require('playwright');(async()=>{const d=__dirname;const b=await chromium.launch();const p=await b.newPage({viewport:{width:794,height:1123},deviceScaleFactor:2});
await p.goto('file://'+d+'/portada.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
console.log('fuentes:',await p.evaluate(()=>['Anton','Rajdhani','Russo One'].map(f=>f+'='+document.fonts.check('20px "'+f+'"')).join(' ')));
await p.screenshot({path:d+'/portada-civic-eg-team-padilla-vista.png'});await p.pdf({path:d+'/portada-civic-eg-team-padilla.pdf',format:'A4',printBackground:true,margin:{top:0,right:0,bottom:0,left:0},pageRanges:'1'});await b.close()})();
