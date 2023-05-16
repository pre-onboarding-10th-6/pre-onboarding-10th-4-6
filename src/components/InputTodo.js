import { FaPlusCircle, FaSpinner } from "react-icons/fa";
import React, { useCallback, useEffect, useState } from "react";

import { createTodo, searchTodo } from "../api/todo";
import useFocus from "../hooks/useFocus";
import Dropdown from "./Dropdown";

const InputTodo = ({ setTodos }) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);

  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const debouncedHandleInputChange = useCallback(
    (() => {
      let timeoutId;
      return (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          // console.log("Debounced input value:", value);
          handleInputChange(value);
        }, 500);
      };
    })(),
    []
  );

  const handleInputChange = useCallback(async (value) => {
    setIsLoading(true); 
    setInputText(value); 

    if (!value) { 
      setDropdownItems([]); 
      setIsLoading(false);
      return;
    }

    const result = await searchTodo(value)
    const matchedItems = result.data.result.map((item, index) => ({
      id: index,
      name: item,
    }));
    
    setDropdownItems(matchedItems)
    setIsLoading(false)
  }, []);

  const handleItemSelection = useCallback(
    async (item) => {
      try {
        setIsLoading(true);
        setDropdownItems([]); // 드롭다운 아이템을 비웁니다.
        const trimmed = item.name.trim();
        if (!trimmed) {
          return alert("Please write something");
        }
  
        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);
  
        setTodos((prev) => [...prev, data]); // 선택한 아이템을 리스트에 추가합니다. 
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setInputText("");
        setIsLoading(false);
      }
    },
    [setTodos]
  );

  const handleSubmit = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert("Please write something");
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos((prev) => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setInputText("");
        setIsLoading(false);
      }
    },
    [inputText, setTodos],
  );

  return (
    <React.Fragment>
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => debouncedHandleInputChange(e.target.value)}
        disabled={isLoading}
      />
      {!isLoading ? (
        <button className="input-submit" type="submit">
          <FaPlusCircle className="btn-plus" />
        </button>
      ) : (
        <FaSpinner className="spinner" />
      )}
    </form>
    {dropdownItems.length > 0 && (
      <Dropdown items={dropdownItems} handleItemSelection={handleItemSelection} inputText={inputText} />
    )}
    </React.Fragment>
  );
};

export default InputTodo;