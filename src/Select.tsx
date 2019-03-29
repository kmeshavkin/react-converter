import * as React from 'react';

interface MyProps {
  options: Array<any>,
  id: number,
  onSelectChange: (currency: string, type: number) => void
}

const Select = (props: MyProps) => {
  const { options } = props;
  const optionsDisplay: Array<any> = options && options.map(el => <option key={el}>{el}</option>);
  return (
    <select onChange={(e) => props.onSelectChange(e.target.value, props.id)}>
      {optionsDisplay}
    </select>
  );
};

export default Select;
