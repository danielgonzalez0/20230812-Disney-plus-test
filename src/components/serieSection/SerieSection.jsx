import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  color: #cacaca;
  border-bottom: 2px solid rgba(249, 249, 249, 0.2);
  margin-bottom: 10px;

  ul {
    display: flex;
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
`;

const Section = styled.section`
  width: 100%;
  padding: 10px 0;
`;

const SerieSection = ({ serie, suggestions }) => {
  const [activeTab, setActiveTab] = useState('episodes');
  const handleTabDisplay = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    console.log(serie);
  }, [serie]);
  return (
    <>
      <Nav>
        <ul>
          <li
            className={activeTab === 'episodes' ? 'active' : null}
            onClick={() => handleTabDisplay('episodes')}
          >
            ÉPISODES
          </li>
          <li
            className={activeTab === 'suggestions' ? 'active' : null}
            onClick={() => handleTabDisplay('suggestions')}
          >
            SUGGESTIONS
          </li>
          <li
            className={activeTab === 'bonus' ? 'active' : null}
            onClick={() => handleTabDisplay('bonus')}
          >
            BONUS
          </li>
          <li
            className={activeTab === 'details' ? 'active' : null}
            onClick={() => handleTabDisplay('details')}
          >
            DÉTAILS
          </li>
        </ul>
      </Nav>
      <Section>
        {activeTab === 'episodes' &&
          'episodes'
        }
        {activeTab === 'suggestions' &&
          'suggestions'
          //   <MovieSuggestions suggestions={suggestions.results} />
        }
        {activeTab === 'details' && 'details'}
        {/* {activeTab === 'details' && <DetailMovie movie={movie} />} */}
        {activeTab === 'bonus' && 'bonus'}
        {/* {activeTab === 'bonus' && <VideoContainer videos={movie.getVideos()} />} */}
      </Section>
    </>
  );
};

export default SerieSection;
