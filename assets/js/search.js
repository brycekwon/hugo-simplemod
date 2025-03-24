import FuseBasic from './libs/fuse.basic.mjs';


const HOST = window.location.protocol + "//" + window.location.host;

const FUSE_OPTIONS = {
    /* Fuzzy Matching Options */
    threshold: 0.4,
    ignoreLocation: true,

    /* Basic Options */
    isCaseSensitive: false,
    ignoreDiacritics: true,
    includeScore: false,
    includeMatches: false,
    minMatchCharLength: 1,
    shouldSort: true,
    findAllMatches: false,
    keys: [
        'title',
        'summary',
        'content',
    ],
};

let fuse;
let searchInput = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');

window.onload = function() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            if (data) {
                fuse = new FuseBasic(data, FUSE_OPTIONS);
            }
        }
    }

    xhr.open('GET', `${HOST}/index.json`);
    xhr.send();
}

searchInput.onkeyup = function() {
    if (fuse) {
        let results = fuse.search(this.value.trim());
        if (results.length > 0) {
            let resultSet = '';
            for (let item in results) {
                resultSet += `<li class="post-entry"><header class="entry-header">${results[item].item.title}&nbsp;»</header>` + `<a href="${results[item].item.permalink}" aria-label="${results[item].item.title}"></a></li>`
            }
            searchResults.innerHTML = resultSet;
        } else {
            searchResults.innerHTML = '';
        }
    }
}

searchInput.addEventListener('search', function() {
    if (!this.value) {
        searchResults.innerHTML = searchInput.value = '';
        searchInput.focus();
    };
});
