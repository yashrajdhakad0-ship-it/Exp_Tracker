const API_KEY = "fdd25e7f53494321bc4cdf0243c16041";

const newsContainer = document.getElementById("newsContainer");
const spinner = document.getElementById("spinner");
const errorDiv = document.getElementById("error");
 

async function fetchNews(category = "general") {
    spinner.style.display = "block";
    errorDiv.textContent = "";

    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
        );

        const data = await response.json();

        displayNews(data.articles);

    } catch (error) {
        errorDiv.textContent = "Failed to load news.";
    }

    spinner.style.display = "none";
}
 


async function searchNews(keyword) {
    spinner.style.display = "block";
    errorDiv.textContent = "";

    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`
        );

        const data = await response.json();

        displayNews(data.articles);

    } catch (error) {
        errorDiv.textContent = "Search failed.";
    }

    spinner.style.display = "none";
}


function displayNews(articles) {
    newsContainer.innerHTML = "";

    articles.forEach(article => {
        newsContainer.innerHTML += `
            <div class="news-card">
                <img src="${article.urlToImage || ''}">
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
                <a href="${article.url}" target="_blank">
                    Read More
                </a>
            </div>
        `;
    });
}

 
document.getElementById("searchBtn").addEventListener("click", () => {
    const keyword = document.getElementById("searchInput").value;

    if (keyword !== "") {
        searchNews(keyword);
    }
});

 
document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
        fetchNews(button.dataset.category);
    });
});

  
fetchNews();