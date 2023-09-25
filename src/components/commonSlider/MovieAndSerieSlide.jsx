import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import { useQuery } from '@tanstack/react-query';
import { getDetail } from '../../services/api';
import { Images } from '../../models/images';

const Container = styled.div`
  cursor: pointer;
  /* position: relative; */
  transition: transform 300ms ease-out 0s;
  /* background-color: rgb(26, 29, 41); */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px,
    rgba(0, 0, 0, 0.73) 0px 16px 10px -10px;

  .link {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 100;
    transition: all 200ms ease-out 0s !important;
    border: 4px transparent;
    border-radius: 4px;

    &:hover {
      padding: 4px;
      transform: scale(1.1);
      border: 4px solid ${colors.white};
      border-radius: 4px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      border-radius: 4px;
    }
  }
  p {
    margin: 10px 0;
  }

  @media screen and (max-width: 767px) {
    width: calc(50vw - 3.5vw - 24px - 20px);
    height: calc((50vw - 3.5vw - 24px - 20px) * 0.5625);
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: calc(33.33vw - 2.33vw - 16px - 20px);
    height: calc(calc(33.33vw - 2.33vw - 16px - 20px) * 0.5625);
  }
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    width: calc(25vw - 1.75vw - 12px - 20px);
    height: calc(calc(25vw - 1.75vw - 12px - 20px) * 0.5625);
  }
  @media screen and (min-width: 1441px) {
    width: calc(20vw - 1.4vw - 9.6px - 20px);
    height: calc(calc(20vw - 1.4vw - 9.6px - 20px) * 0.5625);
  }
`;

const MovieAndSerieSlide = (item) => {
  const serieQueryKey = ['getDataDetail', item.id];
  const { isLoading, data } = useQuery(
    serieQueryKey,
    async () => {
      const itemImageData = await getDetail(
        item.id,
        `${item.type === 'serie' ? 'imageSerie' : 'imageMovie'}`
      );
      const itemImage = new Images(itemImageData);
      console.log('itemImages', itemImage);
      return { itemImage };
    },
    { cacheTime: 0 }
  );

  const { itemImage } = data || [];

  if (isLoading) return <div>en cours de chargement</div>;

  return (
    <>
      <Container>
        <NavLink
          className="link"
          to={`${item.type === 'serie' ? '/serie/' : '/movie/'}${item.id}`}
        >
          {itemImage.backdrops[0] || itemImage.posters[0] ? (
            <img
              src={`https://image.tmdb.org/t/p/w300/${
                itemImage.backdrops[0]
                  ? itemImage.backdrops[0].file_path
                  : itemImage.posters[0].file_path
              }`}
              alt={`titre ${item.name}`}
            />
          ) : (
            <p>{item.name}</p>
          )}
        </NavLink>
      </Container>
    </>
  );
};

export default MovieAndSerieSlide;
