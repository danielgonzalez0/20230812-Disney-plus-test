export class Images {
  constructor(data) {
    this._id = data.id;
    this._backdrops = data.backdrops;
    this._logos = data.logos;
    this._posters = data.posters;
  }

  get id() {
    return this._id;
  }

  getData(array) {
    const dataFR = array
      .filter((image) => image.iso_639_1 === 'fr')
      .sort((a, b) => b.vote_average - a.vote_average);
    const dataEN = array
      .filter((image) => image.iso_639_1 === 'en')
      .sort((a, b) => b.vote_average - a.vote_average);
    if (dataFR.length > 0) {
      return dataFR;
    } else {
      return dataEN;
    }
  }
  get backdrops() {
   return this._backdrops.sort((a, b) => b.vote_average - a.vote_average);
  }
  get logos() {
   return  this.getData(this._logos);
  }
  get posters() {
    return this.getData(this._posters);
  }
}
