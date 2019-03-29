import React from 'react';

interface ButtonProps {
  onButtonClick: () => void
}
 
const Button: React.SFC<ButtonProps> = (props) => {
  return (
    <button onClick={props.onButtonClick}>Convert</button>
  );
}
 
export default Button;