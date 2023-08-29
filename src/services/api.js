const apiKey = process.env.REACT_APP_KEY;
// const providerId = 337; // ID du fournisseur Disney+
let currentPage = 1;
let totalPages = 1;
const allResults = [];

// Fonction récursive pour paginer à travers les résultats
async function getMoviesFromCompany(companyId, totalPage) {
  while (currentPage <= totalPages) {
    //  const url = `https://api.themoviedb.org/3/discover/movie?with_watch_providers=${companyId}&api_key=${apiKey}&language=fr-FR&page=${currentPage}`;

    const url2 = `https://api.themoviedb.org/3/discover/movie?certification=fr&include_adult=false&include_video=false&language=fr-FR&page=${currentPage}&sort_by=popularity.desc&with_companies=${companyId}&api_key=${apiKey}`;

    try {
      const response = await fetch(url2);
      const data = await response.json();

      allResults.push(...data.results);
      //    totalPages = data.total_pages;
      totalPages = totalPage;
      console.log(totalPages);
      currentPage++;
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      return;
    }
  }

  console.log('Tous les résultats:', allResults);
  return allResults;
}

async function getUrl(id, type) {
  const urlSerie = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR&api_key=${apiKey}`;
  const urlMovie = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR&api_key=${apiKey}`;

  switch (type) {
    case 'movie':
      return urlMovie;
    case 'serie':
      return urlSerie;
    default:
      return urlMovie;
  }
}

async function getDetail(id, type) {
  let url = await getUrl(id, type);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      accept: 'application/json',
    });

    if (!response.ok) {
      throw new Error(`Réponse du serveur non-ok : ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    url = '';
    return responseData; // Return the movie results
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
    throw error; // Re-throw the error to be caught by the query
  }
}

export { getDetail, getMoviesFromCompany };
