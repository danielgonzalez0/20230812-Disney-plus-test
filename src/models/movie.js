export class MovieData {
  constructor(data, release, casting) {
    this._id = data.id;
    this._imageBackPath = data.backdrop_path;
    this._genres = data.genres;
    this._overview = data.overview;
    this._imageFrontPath = data.poster_path;
    this._popularity = data.popularity;
    this._companies = data.production_companies;
    this._release = data.release_date;
    this._runtime = data.runtime;
    this._tagline = data.tagline;
    this._title = data.title;
    this._videos = data.videos.results;
  }

  get id() {
    return this._id;
  }
  get imageBackPath() {
    return this._imageBackPath;
  }
  get genres() {
    return this._genres;
  }
  get overview() {
    return this._overview;
  }
  get imageFrontPath() {
    return this._imageFrontPath;
  }
  get popularity() {
    return this._popularity;
  }
  get companies() {
    return this._companies;
  }
  get release() {
    return this._release;
  }
  get runtime() {
    return this._runtime;
  }
  get tagline() {
    return this._tagline;
  }
  get title() {
    return this._title;
  }
  get videos() {
    return this._videos;
  }

  getCompaniesQueryParams() {
    let resultArray = [];
    this._companies.forEach((companie) => {
      resultArray.push(companie.id);
    });
    return resultArray.join('%7C');
  }

  getGenresQueryParams() {
    let genresArray = [];
    let resultArray = [];
    for (let i = 0; i < this._genres.length; i++) {
      genresArray.push(this._genres[i].id);
    }
    for (let i = genresArray.length; i > 0; i--) {
      const slice = genresArray.slice(0, i);
      const string = slice.join('%2C');
      resultArray.push(string);
    }
    return resultArray.join('%7C');
  }

  getVideosByType(type) {
    return this._videos.filter((video) => video.type === type);
  }

  getVideos() {
    let resultArray = [];
    let trailers = this.getVideosByType('Trailer');
    let clips = this.getVideosByType('Clip');
    resultArray = [...trailers, ...clips]
    console.log(resultArray);
    return resultArray;
  }
}

// `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_companies=2%7C6125%7C143191&with_genres=12%2C35%2C10751%2C16%7C12%2C35%2C10751%7C12%2C35%7C12`
