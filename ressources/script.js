const API_KEY = "19b3631b";

function scrollCategory(direction, category) {
  const carrousel = document.getElementById(category);
  carrousel.scrollBy({
    left: 600 * direction,
    behavior: "smooth"
  });
}

async function tendance() {
  const container = document.getElementById("tendance");

  const res = await fetch(`https://www.omdbapi.com/?s=hero&apikey=${API_KEY}&page=1`);
  const data = await res.json();

  container.innerHTML = "";

  data.Search.forEach(movie => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : onerror="this.onerror=null; this.closest('.results').remove();";
    container.innerHTML += `
        <div class="results" onclick="window.location='movie.html?id=${movie.imdbID}'">
          <img src="${poster}"onerror="this.onerror=null; this.closest('.results').remove();">
          <h3>${movie.Title}</h3>
        </div>
      `;
  });

  tendancePage = 1;

  addVoirPlusButtonTendance();
}

async function voirPlusTendance() {
  tendancePage++;

  const res = await fetch(`https://www.omdbapi.com/?s=hero&apikey=${API_KEY}&page=${tendancePage}`);
  const data = await res.json();

  if (!data.Search) {
    document.getElementById("loadMoreTendance").style.display = "none";
    return;
  }

  const container = document.getElementById("tendance");

  document.getElementById("loadMoreTendance").remove();

  data.Search.forEach(movie => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : onerror="this.onerror=null; this.closest('.results').remove();";
    container.innerHTML += `
          <div class="results" onclick="window.location='movie.html?id=${movie.imdbID}'">
            <img src="${poster}" onerror="this.onerror=null; this.closest('.results').remove();">
            <h3>${movie.Title}</h3>
          </div>
        `;
  });

  addVoirPlusButtonTendance();
}

function addVoirPlusButtonTendance() {
  const container = document.getElementById("tendance");

  const oldBtn = document.querySelector(".voir-plus");
  if (oldBtn) oldBtn.remove();

  container.innerHTML += `
        <button id="loadMoreTendance" class="voir-plus button clair" onclick="voirPlusTendance()">Voir Plus</button>
    `;
}
tendance();
//--------------------------------------------//

async function series() {
  const container = document.getElementById("series");

  const res = await fetch(`https://www.omdbapi.com/?s=serie&apikey=${API_KEY}&page=2&type=series`);
  const data = await res.json();

  container.innerHTML = "";

  data.Search.forEach(movie => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : onerror="this.onerror=null; this.closest('.results').remove();";
    container.innerHTML += `
        <div class="results" onclick="window.location='movie.html?id=${movie.imdbID}'">
          <img src="${poster}" onerror="this.onerror=null; this.closest('.results').remove();">
          <h3>${movie.Title}</h3>
        </div>
      `;
  });

  seriesPage = 2;

  addVoirPlusButtonSeries();
}

async function voirPlusSeries() {
  seriesPage++;

  const res = await fetch(`https://www.omdbapi.com/?s=serie&apikey=${API_KEY}&page=${seriesPage}&type=series`);
  const data = await res.json();

  if (!data.Search) {
    document.getElementById("loadMoreSeries").style.display = "none";
    return;
  }

  const container = document.getElementById("series");

  document.getElementById("loadMoreSeries").remove();

  data.Search.forEach(movie => {
    const poster = movie.Poster !== "N/A" ? movie.Poster : onerror="this.onerror=null; this.closest('.results').remove();";
    container.innerHTML += `
          <div class="results" onclick="window.location='movie.html?id=${movie.imdbID}'">
            <img src="${poster}" onerror="this.onerror=null; this.closest('.results').remove();">
            <h3>${movie.Title}</h3>
          </div>
        `;
  });

  addVoirPlusButtonSeries();
}


function addVoirPlusButtonSeries() {
  const container = document.getElementById("series");

  const oldBtn = document.querySelector(".voir-plus2");
  if (oldBtn) oldBtn.remove();

  container.innerHTML += `
        <button id="loadMoreSeries" class="voir-plus2 button clair" onclick="voirPlusSeries()">Voir Plus</button>
    `;
}

series();
