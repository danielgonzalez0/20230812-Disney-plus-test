import React, { useState } from 'react';
import styled from 'styled-components';
import VideoContainer from './VideoContainer';
import DetailMovie from './DetailMovie';
import MovieSuggestions from './MovieSuggestions';

const Nav = styled.nav`
  width: 100%;
  color: #cacaca;
  border-bottom: 2px solid rgba(249, 249, 249, 0.2);
  margin-bottom: 10px;

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  }

  li {
    padding-bottom: 15px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 2px;
    line-height: 1.4;
    cursor: pointer;
    position: relative;
    &::after {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      background: #cacaca;
      height: 3px;
      width: 100%;
      opacity: 0;
      transition: opacity 0.2s ease 0s;
    }
    &:hover:after,
    &:focus:after {
      opacity: 1;
    }
  }
  li.active {
    color: rgb(249, 249, 249);
    &:after {
      background: rgb(249, 249, 249);
      opacity: 1;
    }
  }

  @media screen and (max-width: 700px) {
    ul {
      gap: 25px;
    }
    li {
      font-size: 15px;
    }
  }
`;

const Section = styled.section`
  width: 100%;
  padding: 10px 0;
  .container {
    min-height: 200px;
  }
`;

const MovieSection = ({ movie, suggestions }) => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const handleTabDisplay = (tab) => {
    setActiveTab(tab);
  };
  // useEffect(() => {
  //   console.log(movie);
  // }, [movie]);
  return (
    <>
      <Nav>
        <ul>
          <li
            className={activeTab === 'suggestions' ? 'active' : null}
            tabIndex={0}
            onClick={() => handleTabDisplay('suggestions')}
            onKeyDown={(e) =>
              e.key === 'Enter' && handleTabDisplay('suggestions')
            }
          >
            SUGGESTIONS
          </li>
          <li
            className={activeTab === 'bonus' ? 'active' : null}
            tabIndex={0}
            onClick={() => handleTabDisplay('bonus')}
            onKeyDown={(e) => e.key === 'Enter' && handleTabDisplay('bonus')}
          >
            BONUS
          </li>
          <li
            className={activeTab === 'details' ? 'active' : null}
            tabIndex={0}
            onClick={() => handleTabDisplay('details')}
            onKeyDown={(e) => e.key === 'Enter' && handleTabDisplay('details')}
          >
            DÉTAILS
          </li>
        </ul>
      </Nav>
      <Section>
        <div className="container">
          {activeTab === 'suggestions' && (
            <MovieSuggestions
              suggestions={suggestions.results}
              id={`${'movieSuggestions'}`}
            />
          )}
          {activeTab === 'details' && <DetailMovie movie={movie} />}
          {activeTab === 'bonus' && (
            <VideoContainer videos={movie.getVideos()} id={'bonus'} />
          )}
        </div>
      </Section>
    </>
  );
};

export default MovieSection;
