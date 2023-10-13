import React from 'react';
import { getDetail } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import SerieSlide from './SerieSlide';
import Slider from '../carrousel/Slider';
import { Season } from '../../models/seasons';

const SerieEpisodes = ({ id, season, defaultVideo }) => {
  const movieQueryKey = ['getSeasonDetail', id];
  const { isLoading, data } = useQuery(
    movieQueryKey,
    async () => {
      const seasonVideoData = await getDetail(id, 'seasonVideo', season);
      const seasonData = await getDetail(id, 'season', season);
      const result = new Season(seasonData, seasonVideoData, defaultVideo)
      const seasonDetail = result.getEpisodesWithVideosKey();
      console.log('seasonData', seasonData);
      console.log('seasonVideo', seasonVideoData);
      console.log('episodes', seasonDetail);
      return { seasonDetail };
    }
  );

  const { seasonDetail } = data || [];

  if (isLoading) return <div></div>;
  return (
    <div>
      <Slider array={seasonDetail} componentToMap={SerieSlide} id={`${season.id}`}/>
    </div>
  );
};

export default SerieEpisodes;
