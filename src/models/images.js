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
    const langA = 'fr'; // La première langue que vous souhaitez trier en premier
    const langB = 'en'; // La deuxième langue

    // Filtrer les backdrops par langue
    const backdropsLangA = this._backdrops.filter(
      (backdrop) => backdrop.iso_639_1.toLowerCase() === langA
    );
    const backdropsLangB = this._backdrops.filter(
      (backdrop) => backdrop.iso_639_1.toLowerCase() === langB
    );

    // Trier chaque tableau par note de vote décroissante
    const sortedBackdropsLangA = backdropsLangA.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    const sortedBackdropsLangB = backdropsLangB.sort(
      (a, b) => b.vote_average - a.vote_average
    );

    // Joindre les deux tableaux triés
    const sortedBackdrops = sortedBackdropsLangA.concat(sortedBackdropsLangB);

    return sortedBackdrops;
  }

  get logos() {
    return this.getData(this._logos);
  }
  get posters() {
    return this.getData(this._posters);
  }
}
