document.addEventListener("DOMContentLoaded", () => {
    fetch("data/news.json")
        .then(response => response.json())
        .then(news => {
            const newsContainer = document.getElementById("news-container");
            newsContainer.innerHTML = news.map(item => `
                <p><a href="${item.link}" target="_blank">${item.title}</a></p>
            `).join("");
        })
        .catch(err => {
            document.getElementById("news-container").innerText = "Erro ao carregar notícias.";
        });
});
