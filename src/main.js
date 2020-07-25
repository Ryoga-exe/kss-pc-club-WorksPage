const GITHUB_REPO_OWNER = location.hostname.split(".")[0]; // GitHub Pages で公開することを前提にしている。それ以外の場所で公開するときは値をハードコードするなどの変更が必要。
const GITHUB_REPO_NAME = location.pathname.split("/")[1]; // GitHub Pages で公開することを前提にしている。それ以外の場所で公開するときは値をハードコードするなどの変更が必要。

document.addEventListener('DOMContentLoaded', async () => {

    const pageURLs = await loadPageURLs(); // ToDo Promiseがrejectされたときのエラー表示とか
    const pageFiles = await loadPages(pageURLs); // ToDo 上限を設けて、More ボタンでさらに読み込む
    // ソートをする
    console.log(pageFiles);    // to debug

    let tagStr = getUrlVars().tag;
    let tags = tagStr === undefined ? null : tagStr.split('+');
    console.log(tags); // to debug

    const works = document.getElementById('works');
    pageFiles.forEach(c => {
        let hasTags = false;
        if (tags !== null) {
            if (c.tags !== undefined) {
                let count = 0;
                for (let i = 0; i < c.tags.length; i++) {
                    tags.forEach(t => {
                        if (c.tags[i] == t) count++;
                    })
                }
                if (tags.length == count) hasTags = true;
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

async function loadPageURLs() {
	// https://docs.github.com/en/rest/reference/repos#get-repository-content
	return fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/pages`)
		.then(r => r.json())
		.then(json => json
			.map(o => o["name"])
			.filter(o => /^.*.json$/.test(o)) // pagesディレクトリのjsonのすべてがpageを表すものだという前提。
			.map(o => `pages/${o}`));
}

async function loadPages(urls) {
	return Promise.all(urls.map(o => fetch(o).then(r => r.json())));
}

async function getJSON(fileName) {
    let jsonContent;
    await fetch(fileName).then(r => r.text()).then(t => { jsonContent = JSON.parse(t); });
    return jsonContent;
}

function getUrlVars() {
    let vars = [], hash = "", array = "";
    hash = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    hash.forEach(c => {
        array = c.split('=');
        vars.push(c);
        vars[array[0]] = array[1];
    })
    return vars;
}
