import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../utils/variables';
import { useQuery } from '@tanstack/react-query';
import { getDetail } from '../../services/api';
import { Images } from '../../models/images';
import Spinner from '../spinner/Spinner';

const Container = styled.div`
  cursor: pointer;
  position: relative;
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
    z-index: 10;

    &:hover,
    &:focus-visible {
      padding: 4px;
      transform: scale(1.1);
      border: 4px solid ${colors.white};
      border-radius: 10px;
      outline: none;
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

const SpinnerContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 50px;
    height: 50px;
  }
`;

const MovieAndSerieSlide = (item, isDragging, index, isVisible) => {
  const serieQueryKey = ['getDataDetail', item.id];
  const { isLoading, data } = useQuery(serieQueryKey, async () => {
    const itemImageData = await getDetail(
      item.id,
      `${item.type === 'serie' ? 'imageSerie' : 'imageMovie'}`
    );
    const itemImage = new Images(itemImageData);
    // console.log(itemImage);
    return { itemImage };
  });

  const { itemImage } = data || [];


  if (isLoading)
    return (
      <Container>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </Container>
    );

  if(itemImage) return (
    <Container>
      <Link
        className="link"
        tabIndex={isVisible === true ? 0 : -1}
        to={`${item.type === 'serie' ? '/serie/' : '/movie/'}${item.id}`}
        onClick={(e) => {
          // console.log('isDragging', isDragging);
          if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            // console.log('event click annulé');
          }
        }}
        // onKeyDown={(e) => {
        //   // Si la touche "Entrée" est enfoncée, naviguer vers le lien
        //   if (e.key === 'Enter') {
        //     window.location.href = `${
        //       item.type === 'serie' ? '/serie/' : '/movie/'
        //     }${item.id}`;
        //   }
        // }}
      >
        {itemImage && (itemImage.backdrops || itemImage.posters) ? (
          <img
            src={`https://image.tmdb.org/t/p/w300/${
              itemImage.backdrops[0]
                ? itemImage.backdrops[0].file_path
                : itemImage.posters[0].file_path
            }`}
            alt={`titre ${item.name}`}
            data-id={index}
          />
        ) : (
          <p>{item.name}</p>
        )}
      </Link>
    </Container>
  );

  return (
    <Container>
      Media not found
    </Container>
  )
};

export default MovieAndSerieSlide;
