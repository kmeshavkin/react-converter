import * as React from 'react';

interface SelectProps {
  options: Array<any>,
  id: number,
  onSelectChange: (id: number, currency: string) => void
}

const Select = (props: SelectProps) => {
  const { options } = props;
  const optionsDisplay: Array<any> = options && options.map(el => <option key={el}>{el}</option>);
  return (
    <select onChange={(e) => props.onSelectChange(props.id, e.target.value)}>
      {optionsDisplay}
    </select>
  );
};

export default Select;
