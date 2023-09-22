export class SerieData {
  constructor(data, casting) {
    this._id = data.id;
    this._imageBackPath = data.backdrop_path;
    this._genres = data.genres;
    this._overview = data.overview;
    this._imageFrontPath = data.poster_path;
    this._popularity = data.popularity;
    this._companies = data.production_companies;
    this._first_release = data.first_air_date;
    this._last_release = data.last_air_date;
    this._tagline = data.tagline;
    this._title = data.name;
    this._videos = data.videos.results;
    this._number_of_seasons = data.number_of_seasons;
    this._seasons = data.seasons;
    this._runtime = data.last_episode_to_air.runtime;
    this._cast = casting.cast;
    this._crew = casting.crew;
    this._type = 'serie';
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
  get first_release() {
    return this._first_release;
  }
  get last_release() {
    return this._last_release;
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
  get number_of_seasons() {
    return this._number_of_seasons;
  }
  get seasons() {
    return this._seasons.filter((season) => season.season_number > 0);
  }
  get cast() {
    return this._cast;
  }
  get crew() {
    return this._crew;
  }
  get runtime() {
    return this._runtime;
  }
  get type() {
    return this._type;
  }

  getCompaniesQueryParams() {
    let resultArray = [];
    let companiesArray = [1, 2, 3, 420, 7521];
    this._companies
      .filter((companie) => companiesArray.includes(companie.id))
      .forEach((companie) => {
        resultArray.push(companie.id);
      });
    if (resultArray.length === 0) {
      resultArray = companiesArray;
    }
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
    resultArray = [...trailers, ...clips];
    return resultArray;
  }

  getDirectors() {
    let resultArray = [];
    resultArray = this._crew.filter(
      (person) =>
        person.job === 'Executive Producer' &&
        person.known_for_department === 'Production'
    );
    return resultArray
  }
}
