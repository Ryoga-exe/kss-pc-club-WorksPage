document.addEventListener('DOMContentLoaded', async () => {
    let node = document.getElementsByTagName('include_');
    
    for (let i = 0; i < node.length; i++) {
        const src = node[i].getAttribute('src');
        const css = node[i].getAttribute('css');
        if (src !== null) loadHTML(src, node[i]);
        if (css !== null) loadCSS(css);
    }
})

function loadHTML(_html, elem){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",_html,true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let data = xmlhttp.responseText; // Get as string
            elem.innerHTML = data;
            return data;
        }
    }
    xmlhttp.send(null);
}

function loadCSS(css) {
    let elem = document.createElement('link');
    elem.setAttribute('rel', 'stylesheet');
    elem.setAttribute('type', 'text/css');
    elem.setAttribute('href', css);
    document.getElementsByTagName('head')[0].appendChild(elem);
}