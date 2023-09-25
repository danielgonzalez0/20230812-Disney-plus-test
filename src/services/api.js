const apiKey = process.env.REACT_APP_KEY;
const apiToken = process.env.REACT_APP_TOKEN;
// const providerId = 337; // ID du fournisseur Disney+

/**
 * return API url
 * @param {string} url: API url
 */
class Api {
  constructor(url, options) {
    this._url = url;
    this._options = options;
  }
  /**
   * get data from an API
   */
  async getData() {
    return await fetch(this._url, this._options)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      }) //end pomise then
      .then((res) => {
        // console.log(res);
        return res;
      })
      //end promise then
      .catch(function (error) {
        console.log(`erreur: ${error}`);
      }); // end catch
  }
}

// Fonction récursive pour paginer à travers les résultats
async function getMoviesFromCompany(companyId, totalPage, genre) {
  const allResults = [];
  let currentPage = 1;
  while (currentPage <= totalPage) {
    //  const url = `https://api.themoviedb.org/3/discover/movie?with_watch_providers=${companyId}&api_key=${apiKey}&language=fr-FR&page=${currentPage}`;

    const url2 = `https://api.themoviedb.org/3/discover/movie?certification=fr&include_adult=false&include_video=true&language=fr-FR&page=${currentPage}&sort_by=popularity.desc&with_companies=${companyId}&with_genres=${genre}&api_key=${apiKey}`;

    try {
      const response = await fetch(url2);
      const data = await response.json();

      allResults.push(...data.results);
      currentPage++;
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      return;
    }
  }
  console.log('Tous les résultats:', allResults);
  return allResults;
}
// Fonction récursive pour paginer à travers les résultats
async function getAllMovies(totalPage, type) {
  const companyId = '1%7C2%7C3%7C420%7C7521%7C3166%7C281%7C54';
  const allResults = [];
  let currentPage = 1;
  while (currentPage <= totalPage) {
    const url1 = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-Fr&page=${currentPage}&sort_by=popularity.desc&with_companies=${companyId}&api_key=${apiKey}`;
    const url2 = `https://api.themoviedb.org/3/discover/movie?certification=fr&include_adult=false&include_video=true&language=fr-FR&page=${currentPage}&sort_by=popularity.desc&vote_count.gte=20&with_companies=${companyId}&api_key=${apiKey}`;

    try {
      const response = await fetch(type === 'series' ? url1 : url2);
      const data = await response.json();
      let dataToAdd;
      if (type === 'series') {
        dataToAdd = data.results.filter((data) =>
          Reflect.has(data, 'first_air_date') && data.first_air_date !==""
        );
      } else {
        dataToAdd = data.results.filter((data) =>
          Reflect.has(data, 'release_date')
        );
      }

      allResults.push(...dataToAdd);
      currentPage++;
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      return;
    }
  }

  console.log('Tous les résultats:', allResults);
  return allResults;
}

/**
 * url of tmdb depending on a specific type
 * @param {number||string} id of a movie or a tv show
 * @param {string} type of the request
 * @param {number||string} season of a tv show
 * @returns an url for the api call
 */
async function getUrl(id, type, season) {
  const urlSerie = `https://api.themoviedb.org/3/tv/${id}?append_to_response=videos&language=fr-FR`;
  const urlMovie = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=fr-FR`;
  const urlImageMovie = `https://api.themoviedb.org/3/movie/${id}/images?include_image_language=fr%2Cen`;
  const urlImageSerie = `https://api.themoviedb.org/3/tv/${id}/images?include_image_language=fr%2Cen`;
  const urlCasting = `https://api.themoviedb.org/3/movie/${id}/credits?language=fr-FR`;
  const urlSerieCasting = `https://api.themoviedb.org/3/tv/${id}/credits?language=fr-FR`;
  const urlSeason = `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=fr-FR`;
  const urlSeasonVideos = `https://api.themoviedb.org/3/tv/${id}/season/${season}/videos?language=en-US`;

  switch (type) {
    case 'movie':
      return urlMovie;
    case 'serie':
      return urlSerie;
    case 'imageMovie':
      return urlImageMovie;
    case 'imageSerie':
      return urlImageSerie;
    case 'casting':
      return urlCasting;
    case 'castingSerie':
      return urlSerieCasting;
    case 'season':
      return urlSeason;
    case 'seasonVideo':
      return urlSeasonVideos;
    default:
      return urlMovie;
  }
}
/**
 * get detail of asset of thmb depending of an id and a type
 * @param {number||string} id of a movie or a tv show
 * @param {string} type of the request
 * @param {number||string} season of a tv show
 * @returns array with the detail of an asset (movie, tv show, images, ...)
 */
async function getDetail(id, type, season) {
  let url = await getUrl(id, type, season);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const response = await new Api(url, options).getData();
  return response;
}
/**
 * get detail of asset of thmb depending of an genres and companies
 * @param {string} genres of the movie
 * @param {string} companies of the movie
 * @returns array with the detail movies suggestions
 */
async function getMoviesSuggestion(genres, companies) {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_companies=${companies}&with_genres=${genres}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const response = new Api(url, options).getData();
  return response;
}
/**
 * get detail of asset of thmb depending of an genres and companies
 * @param {string} genres of the movie
 * @param {string} companies of the movie
 * @returns array with the detail movies suggestions
 */
async function getSeriesSuggestion(genres, companies) {
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_companies=${companies}&with_genres=${genres}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
  };

  const response = await new Api(url, options).getData();
const result = response.results.filter(
  (data) =>
    Reflect.has(data, 'first_air_date') && data.first_air_date.length > 0
);
    console.log(result);
  return result;
}

export {
  getDetail,
  getMoviesFromCompany,
  getAllMovies,
  getMoviesSuggestion,
  getSeriesSuggestion,
};
