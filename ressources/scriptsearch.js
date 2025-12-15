const API_KEY = "19b3631b";
let timer;
let currentPage = 1;
let currentSearch = "";

window.onload = () => {
  searchMovies()
};

async function searchMovies() {
  clearTimeout(timer);

  timer = setTimeout(async () => {
    const title = document.getElementById("search").value.trim();
    const container = document.getElementById("movies");

    if (title.length < 2) {
      container.innerHTML = "Veuillez rechercher un film";
      document.getElementById("loadMore").style.display = "none";
      return;
    }

    currentSearch = title;
    currentPage = 1;

    const res = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${API_KEY}&page=1`);
    const data = await res.json();

    container.innerHTML = "";

    if (!data.Search) {
      container.innerHTML = `<p>Aucun résultat trouvé.</p>`;
      document.getElementById("loadMore").style.display = "none";
      return;
    }

    data.Search.forEach(movie => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : onerror="this.onerror=null; this.closest('.results').remove();";
      container.innerHTML += `
        <div class="results" onclick="window.location='movie.html?id=${movie.imdbID}'">
          <img src="${poster}" onerror="this.onerror=null; this.closest('.results').remove();">
          <h3>${movie.Title}</h3>
        </div>
      `;
    });

    document.getElementById("loadMore").style.display = "block";
  }, 100);
}


async function voirPlus() {
  currentPage++;

  const res = await fetch(`https://www.omdbapi.com/?s=${currentSearch}&apikey=${API_KEY}&page=${currentPage}`);
  const data = await res.json();

  if (!data.Search) {
    document.getElementById("loadMore").style.display = "none";
    return;
  }
  data.Search.forEach(movie => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : onerror="this.onerror=null; this.closest('.results').remove();";
    document.getElementById("movies").innerHTML += `
      <div class="results" onclick="window.location='movie.html?id=${movie.imdbID}'">
        <img src="${poster}" onerror="this.onerror=null; this.closest('.results').remove();">
        <h3>${movie.Title}</h3>
      </div>
    `;
  });
}
