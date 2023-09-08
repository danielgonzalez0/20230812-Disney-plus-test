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
        console.log(res);
        return res;
      })
      //end promise then
      .catch(function (error) {
        console.log(`erreur: ${error}`);
      }); // end catch
  }
}

// Fonction récursive pour paginer à travers les résultats
async function getMoviesFromCompany(companyId, totalPage) {
  const allResults = [];
  let currentPage = 1;
  while (currentPage <= totalPage) {
    //  const url = `https://api.themoviedb.org/3/discover/movie?with_watch_providers=${companyId}&api_key=${apiKey}&language=fr-FR&page=${currentPage}`;

    const url2 = `https://api.themoviedb.org/3/discover/movie?certification=fr&include_adult=false&include_video=true&language=fr-FR&page=${currentPage}&sort_by=popularity.desc&with_companies=${companyId}&api_key=${apiKey}`;

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

/**
 * url of tmdb depending on a specific type
 * @param {number||string} id of a movie or a tv show
 * @param {string} type of the request
 * @returns an url for the api call
 */
async function getUrl(id, type) {
  const urlSerie = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR`;
  const urlMovie = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=fr-FR`;
  const urlImageMovie = `https://api.themoviedb.org/3/movie/${id}/images?include_image_language=fr%2Cen`;

  switch (type) {
    case 'movie':
      return urlMovie;
    case 'serie':
      return urlSerie;
    case 'imageMovie':
      return urlImageMovie;
    default:
      return urlMovie;
  }
}
/**
 * get detail of asset of thmb depending of an id and a type
 * @param {number||string} id of a movie or a tv show
 * @param {string} type of the request
 * @returns array with the detail of an asset (movie, tv show, images, ...)
 */
async function getDetail(id, type) {
  let url = await getUrl(id, type);

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

export { getDetail, getMoviesFromCompany };


