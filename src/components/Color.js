import React from 'react';

const red = "#ff0000";

const Color = ({children, inputText}) => {
  const initial = children.name.split(inputText)

  return (
    <span>
      {initial.map((normal, i) => 
        i > 0 ? (
          <React.Fragment key={inputText + i}>
            <span
              style={{ color: red }}
            >
              {inputText}
            </span>
            {normal}
          </React.Fragment>
        ) : (
          <React.Fragment key={i}>
            {normal}
          </React.Fragment>
        )
      )}
    </span>
  )
};

export default Color;