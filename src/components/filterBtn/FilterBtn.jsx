import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  background-color: rgba(182, 182, 182, 0.2);
  border-radius: 18px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  transition: all 0.3s ease 0s;
  color: rgb(249, 249, 249);
  padding: 10px 12px;
  margin-bottom: 10px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: rgb(19, 19, 19);
  }

  span {
    margin-right: 20px;
  }
`;

const FilterValueContainer = styled.ul`
  position: absolute;
  top: 48px;
  left: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 18px 0;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 250ms;
  padding: 10px 0;
  min-width: 200px;
  font-size: 15px;
  letter-spacing: 2px;
  opacity: 1;
  li {
    padding: 5px 10px;
    text-transform: uppercase;
    color: rgb(249, 249, 249);
    color: #cacaca;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
`;

const FilterBtn = ({ array, filterValue, setFilterValue }) => {
//   const [filterValue, setFilterValue] = useState(array[0]);
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndex = () => {
    const newIndex = array.findIndex((genre) => genre === filterValue);
    setActiveIndex(newIndex);
  };

  const handleLiMouseEnter = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    handleIndex();
  }, [filterValue, array]);

  return (
    <Container
      onClick={() => {
        setIsOpen(!isOpen);
        handleIndex();
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') setIsOpen(!isOpen);
      }}
    >
      <span>{filterValue.name}</span>
      <StyledIcon icon={faChevronDown} />
      {isOpen && (
        <FilterValueContainer>
          {array.map((genre, index) => (
            <li
              key={genre.id}
              ref={genre === filterValue ? filterRef : null}
              tabIndex={0}
              onClick={() => setFilterValue(genre)}
              onMouseEnter={() => handleLiMouseEnter(index)} //
              aria-selected={activeIndex === index ? 'true' : 'false'}
              style={{
                backgroundColor:
                  activeIndex === index
                    ? 'rgba(151, 151, 151, 0.34)'
                    : 'transparent',
              }}
            >
              {genre.name}
            </li>
          ))}
        </FilterValueContainer>
      )}
    </Container>
  );
};

export default FilterBtn;
