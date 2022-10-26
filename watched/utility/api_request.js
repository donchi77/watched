module.exports = {
    search: (title, id, next) => {
        let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
    
        xhr.onload = () => {
            next(null, xhr.responseText);
        };

        xhr.onerror = () => {
            next(xhr.responseText);
        }
    
        xhr.open("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/?" + (title ? "s=" + title : "i=" + id) + "&r=json");
        xhr.setRequestHeader("x-rapidapi-key", "4b216294c6msh09bb5dd897fc140p1a47a2jsn3af06f2b4e1a");
        xhr.setRequestHeader("x-rapidapi-host", "movie-database-imdb-alternative.p.rapidapi.com");
    
        xhr.send();
    }
}