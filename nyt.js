const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //1
const key = 'Sw0MNndGIDJbblTTRFH00XGXckk9qBwh'; //2
let url; //3

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

nav.style.display = 'none'; // we don't need this until after any returns

let pageNumber = 0;
console.log('PageNumber:', pageNumber);
// let displayNav = false;

//RESULTS SECTION
const section = document.querySelector('section');

searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage); //3
previousBtn.addEventListener('click', previousPage); //3

function fetchResults(e) {
    e.preventDefault(); //1
    // Assemble the full URL
    url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; //3
    console.log("URL: ", url);

    //INSERT HERE  
    if (startDate.value !== '') {
        console.log(startDate.value);
        url += '&begin_date=' + startDate.value;
    };

    if (endDate.value !== '') {
        url += '&end_date=' + endDate.value;
    };
    //END HERE

    fetch(url).then(function (result) {
        return result.json();
    }).then(function (json) {
        displayResults(json); //1 & //3
    });
}

//2
function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    let articles = json.response.docs;
    console.log("ARTICLES.LENGTH: " + articles.length);

    if (articles.length >= 10) {
        nav.style.display = 'block'; //shows the nav display if 10 items are in the array
        if (pageNumber === 0) {
            // HIDE PREV BUTTON SHOW NEXT BUTTON
            console.log("HIDE PREV BUTTON SHOW NEXT BUTTON");
        }
    } else if (articles.length < 10 && pageNumber > 0) {
        // SHOW PREV BUTTON HIDE NEXT BUTTON
        console.log("SHOW PREV BUTTON HIDE NEXT BUTTON");

    } else {
        nav.style.display = 'none'; //hides the nav display if 10 or fewer items are in the array
        // query 'The Wreckers Opera' for one item returned
    }

    if (articles.length === 0) {
        console.log("No results");
    } else {
        for (let i = 0; i < articles.length; i++) {
            let article = document.createElement('article');
            let heading = document.createElement('h2');
            let link = document.createElement('a');
            let img = document.createElement('img'); //1
            let para = document.createElement('p');
            let clearfix = document.createElement('div');

            let current = articles[i];
            console.log("Current:", current);

            link.href = current.web_url;
            link.textContent = current.headline.main;
            para.textContent = 'Keywords: '; //3

            for (let j = 0; j < current.keywords.length; j++) {
                let span = document.createElement('span');
                span.textContent += current.keywords[j].value + ' ';
                para.appendChild(span);
            }

            if (current.multimedia.length > 0) {
                //3
                img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
                //4
                img.alt = current.headline.main;
            }

            //8
            clearfix.setAttribute('class', 'clearfix');

            //9
            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img); //5
            article.appendChild(para);
            article.appendChild(clearfix);
            section.appendChild(article);
        }
    }
};

function nextPage(e) {
    pageNumber++; //1
    fetchResults(e); //2
    console.log("Page number:", pageNumber); //3
};

function previousPage(e) {
    if (pageNumber > 0) { //1
        pageNumber--; //2
    } else {
        return; //3
    }
    fetchResults(e); //4
    console.log("Page:", pageNumber); //5
};