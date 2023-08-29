import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getDetail } from '../../services/api';

const Background = styled.div`
  left: 0px;
  opacity: 1;
  position: fixed;
  right: 0px;
  top: 0px;
  transition: opacity 200ms ease 0s;
  width: 100%;
  z-index: 0;
  img {
    width: 100vw;
  }
`;

const Container = styled.main`
  margin-top: 70px;
  /* img {
    height: 200px;
    width: auto;
  } */
`;

const Serie = () => {
  const { id } = useParams();
  const queryKey = ['getSerieDetail'];
  const { isLoading, data } = useQuery(
    queryKey,
    async () => {
      return await getDetail(id, 'serie');
    },
    { cacheTime: 0 }
  );
  const serie = data || [];

  if (isLoading) return <div>en cours de chargement</div>;

  return (
    <Container>
      <Background>
        <img
          src={`https://image.tmdb.org/t/p/original/${serie.backdrop_path}`}
          alt={serie.name}
        />
      </Background>
      {'page serie ' + id}
    </Container>
  );
};

export default Serie;
