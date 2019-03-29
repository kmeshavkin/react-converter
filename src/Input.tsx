import React from 'react';

interface InputProps {
  id: number,
  value: string,
  onInputChange: (id: number, value: string) => void
}

const Input = (props: InputProps) => {
  return (
    <input value={props.value} onChange={(e) => props.onInputChange(props.id, e.target.value)}/>
  );
}
 
export default Input;