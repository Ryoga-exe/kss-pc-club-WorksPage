let pages = ['sample', '10sChallenge', 'sigmabeat', 'tetTyping'];  // ToDo : 動的に、自動で page ディレクトリより取得
let pageFiles = new Array();
document.addEventListener('DOMContentLoaded', async () => {
    
    await loadPages(); // ToDo 上限を設けて、More ボタンでさらに読み込む
    // ソートをする
    console.log(pageFiles); // to debug

    let works = document.getElementById('works');

    pageFiles.forEach(c => {
        let container = document.createElement('div');
        let description = document.createElement('span');
        container.className = 'work-container'
        description.textContent = c.name === undefined ? ' ' : c.name;
        if (c.image !== undefined) container.style.backgroundImage = 'url(pages/' + c.image + ')';
        container.appendChild(description);
        works.appendChild(container);
    });
})

async function loadPages() {
    for (let i = 0; i < pages.length; i++) {
        pageFiles[i] = (await (getJSON('pages/' + pages[i] + '.json')));
    }
}

async function getJSON(fileName) {
    let jsonContent;
    await fetch(fileName).then(r => r.text()).then(t => { jsonContent = JSON.parse(t); });
    return jsonContent;
}