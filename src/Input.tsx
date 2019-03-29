import React from 'react';

interface Props {
  id: number,
  onInputChange: (value: number, type: number) => void
}

const Input = (props: Props) => {
  return (
    <input onChange={(e) => props.onInputChange(parseInt(e.target.value), props.id)}/>
  );
}
 
export default Input;