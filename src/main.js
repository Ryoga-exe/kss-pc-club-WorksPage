const pages = ['sample', '10sChallenge', 'sigmabeat', 'tetTyping', '15puzzle'];  // ToDo : 動的に、自動で page ディレクトリより取得
let pageFiles = new Array();
document.addEventListener('DOMContentLoaded', async () => {

    await loadPages(); // ToDo 上限を設けて、More ボタンでさらに読み込む
    // ソートをする
    console.log(pageFiles);    // to debug

    let tagStr = getUrlVars().tag;
    let tags = tagStr === undefined ? null : tagStr.split('+');
    console.log(tags); // to debug
    
    const works = document.getElementById('works');
    pageFiles.forEach(c => {
        let hasTags = false;
        if (tags !== null) {
            for (let i = 0; i < c.tags.length; i++) {
                tags.forEach(t => {
                    if (c.tags[i] == t) hasTags = true;
                })
            }
        }
        else hasTags = true;
        if (hasTags) {
            let article = document.createElement('article');
            let description = document.createElement('span');
            article.className = 'item'
            description.textContent = c.name === undefined ? ' ' : c.name;
            if (c.image !== undefined) article.style.backgroundImage = `url(pages/${c.image})`;
            article.appendChild(description);
            works.appendChild(article);
        }
    });
})

async function loadPages() {
    for (let i = 0; i < pages.length; i++) {
        pageFiles[i] = (await (getJSON(`pages/${pages[i]}.json`)));
    }
}

async function getJSON(fileName) {
    let jsonContent;
    await fetch(fileName).then(r => r.text()).then(t => { jsonContent = JSON.parse(t); });
    return jsonContent;
}

function getUrlVars() {
    let vars = [], hash = "", array = "";
    hash  = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (let i = 0; i < hash.length; i++) {
        array = hash[i].split('=');
        vars.push(array[0]);
        vars[array[0]] = array[1];
    }
    return vars;
}