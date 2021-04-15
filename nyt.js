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

//RESULTS SECTION
const section = document.querySelector('section');

nav.style.display = 'none';
let pageNumber = 0;
let displayNav = false;

//1                     //2   
searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage); //3
previousBtn.addEventListener('click', previousPage); //3

function fetchResults(e) {
    e.preventDefault(); //1
    // Assemble the full URL
    url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; //3

    //INSERT HERE  
    if (startDate.value !== '') {
        console.log(startDate.value)
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
    let articles = json.response.docs;

    if (articles.length >= 10) {
        nav.style.display = 'block'; //shows the nav display if 10 items are in the array
    } else {
        nav.style.display = 'none'; //hides the nav display if fewer than 10 items are in the array
        // query 'The Wreckers Opera' for one item returned
    }

    if (articles.length === 0) {
        console.log("No results");
    } else {
        //Display the data
        for (let i = 0; i < articles.length; i++) {
            let article = document.createElement('article'); //1
            let heading = document.createElement('h2'); //2
            let link = document.createElement('a');

            let current = articles[i]; //2
            console.log("Current:", current); //3

            link.href = current.web_url; //4
            link.textContent = current.headline.main;

            article.appendChild(heading); //3
            heading.appendChild(link);
            section.appendChild(article); //4
        }
    }
};

function nextPage() {
    console.log("Next button clicked");
} //5

function previousPage() {
    console.log("Next button clicked");
} //5