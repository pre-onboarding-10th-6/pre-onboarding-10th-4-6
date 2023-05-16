import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Color from './Color'
import { searchTodo } from "../api/todo";

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

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Dropdown = ({ items, handleItemSelection, inputText }) => {
  const [loading, setLoading] = useState(false);

  const handleItemClick = (item) => {
    handleItemSelection(item); 
  };

  useEffect(() => {
    const handleScroll = (event) => {
      const target = event.target;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        console.log('끝까지 옴')
        setLoading(true)
      }
    };

    const dropdownContainer = document.getElementById("dropdown-container");
    dropdownContainer.addEventListener("scroll", handleScroll);

    return () => {
      dropdownContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <DropdownContainer id='dropdown-container'>
      <DropdownList>
        {items.map((item) => (
          <DropdownItem 
            key={item.id} 
            onClick={() => handleItemClick(item)}
          >
            <Color inputText={inputText}>{item}</Color>
          </DropdownItem>
        ))}
        {loading && <Loading>. . .</Loading>}
      </DropdownList>
    </DropdownContainer>
  );
};

export default Dropdown;