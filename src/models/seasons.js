export class Season {
  constructor(data, videos, defaultVideoKey) {
    this._episodes = data.episodes;
    this._videos = videos.results;
    this._defaultKey = defaultVideoKey.key ? defaultVideoKey.key : null;
  }
  getEpisodesWithVideosKey() {
    let videoKey;
    if (this._videos.length > 0) {
      videoKey = this._videos[0].key;
    } else {
      videoKey = this._defaultKey ? this._defaultKey : null;
    }
    const resultArray = [];
    this._episodes.forEach((episode) => {
      const episodeData = {
        number: episode.episode_number,
        name: episode.name,
        runtime: episode.runtime,
        image: episode.still_path,
        overview: episode.overview,
        key: videoKey,
      };
      resultArray.push(episodeData);
    });
    return resultArray;
  }
}
