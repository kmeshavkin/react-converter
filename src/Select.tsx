import * as React from 'react';

type MyProps = {
  options: Array<any>
}

const Select = (props: MyProps) => {
  const { options } = props;
  const optionsDisplay: Array<any> = options && options.map(el => <option key={el}>{el}</option>);
  return (
    <select>
      {optionsDisplay}
    </select>
  );
};

export default Select;
