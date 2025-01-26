const accesKey = "xZ4EJVey4GGI8qDrRmDQfJFHzfPe-ULafi81RAPR8pw"
const formEl = document.getElementById("form-id") ;
const inputEl = document.getElementById("input-el") ;
const searchBtn = document.getElementById("search-btn") ;
const showMoreBtn = document.getElementById("show-more-btn") ;
const searchResults = document.querySelector(".search-results") ;
let inputData = "" ;
let page = 1 ;

async function searchImages() {
    inputData = inputEl.value ;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesKey}`  ;

    const response =await fetch(url) ;
    const data = await response.json() ;

    const results = data.results ;

    if( page===1){
        searchResults.innerHTML="";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small ;
        image.alt = result.alt_description ;
        const imageLink = document.createElement("a");
        imageLink.href= result.links.html ;
        imageLink.target="_blank";
        imageLink.textContent = result.alt_description ;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++ 
    if(page >1) {
        showMoreBtn.style.display="block"; 
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    page=1 ;
    searchImages()
})

showMoreBtn.addEventListener("click", (event) => {
    searchImages()
})