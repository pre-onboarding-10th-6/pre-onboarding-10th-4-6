import React from "react";
import styled from "styled-components";
import Color from './Color'

const DropdownContainer = styled.div`
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-height: 400px;
  overflow-y: auto;
`;

const DropdownList = styled.ul`
  list-style-type: none;
  padding: 4px;
  margin: 0;
`;

const DropdownItem = styled.li`
  padding: 8px 16px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #aaa;
  }

  &:active {
    background-color: #888;
    border: 2px solid yellow;
  }
`;

const Dropdown = ({ items, handleItemSelection, inputText }) => {
  const handleItemClick = (item) => {
    handleItemSelection(item); 
  };

  return (
    <DropdownContainer>
      <DropdownList>
        {items.map((item) => (
          <DropdownItem 
            key={item.id} 
            onClick={() => handleItemClick(item)}
          >
            <Color inputText={inputText}>{item}</Color>
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default Dropdown;
