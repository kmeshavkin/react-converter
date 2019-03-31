import * as React from 'react';
import './Select.css';

interface SelectProps {
  options: Array<any>,
  id: number,
  onChange: (id: number, currency: string, value: undefined) => void
}

const Select = (props: SelectProps) => {
  const { options } = props;
  const optionsDisplay: Array<any> = options && options.map(el => <option key={el}>{el}</option>);
  return (
    <select onChange={(e) => props.onChange(props.id, e.target.value, undefined)}>
      {optionsDisplay}
    </select>
  );
};

export default Select;
