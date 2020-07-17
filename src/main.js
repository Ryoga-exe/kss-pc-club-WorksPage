let pages = ['sample', '10sChallenge', 'sigmabeat', 'tetTyping'];  // ToDo : 動的に、自動で page ディレクトリより取得
let pageFiles = new Object();
document.addEventListener('DOMContentLoaded', async () => {
    
    for (let i = 0; i < pages.length; i++) {
        pageFiles[i] = (await (getJSON('pages/' + pages[i] + '.json')));
    } // ToDo 上限を設けて、More ボタンでさらに読み込む
    console.log(pageFiles[0]);
})

async function getJSON(fileName) {
    let jsonContent;
    await fetch(fileName).then(r => r.text()).then(t => { jsonContent = JSON.parse(t); });
    return jsonContent;
}