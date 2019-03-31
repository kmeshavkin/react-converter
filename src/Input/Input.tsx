import React from 'react';
import './Input.css';

interface InputProps {
  id: number,
  value: string,
  onChange: (id: number, currency: undefined, value: string) => void
}

const Input = (props: InputProps) => {
  return (
    <input value={props.value} onChange={(e) => props.onChange(props.id, undefined, e.target.value)}/>
  );
}
 
export default Input;