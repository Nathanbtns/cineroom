const API_KEY = "19b3631b";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadMovie() {
    if (!id) return;

    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`);
    const movie = await res.json();
    const poster = movie.Poster !== "N/A" ? movie.Poster : "ressources/indisponible.jpg";

    document.getElementById("fullinfo").innerHTML = `
    <div class="maindetails">
    <h1>${movie.Title}</h1>
    <img class="fullimg" src="${poster}" width="300"onerror="this.onerror=null; this.src='ressources/indisponible.jpg';">
    </div>
    <div class="details">
    <p><strong>Année :</strong> ${movie.Year}</p>
    <p><strong>Genre :</strong> ${movie.Genre}</p>
    <p><strong>Acteurs :</strong> ${movie.Actors}</p>
    <p><strong>Résumé :</strong> ${movie.Plot}</p>
    <p><strong>Note IMDb :</strong> ${movie.imdbRating}</p>
    </div>
  `;
    document.title = `CINÉROOM - ${movie.Title}`;
}

loadMovie();
