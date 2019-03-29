import * as React from 'react';
import Select from './Select';
import Input from './Input';

interface MyState {
  currencyList: Array<string>,
  currencyArr: Object,
  data: Array<{ currency: string, value: number }>
};

class App extends React.Component<any, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currencyList: [],
      currencyArr: {},
      data: [
        { currency: 'USD', value: 1 },
        { currency: 'USD', value: 1 }
      ]
    };
  }

  async componentDidMount() {
    const rawCurrencyArr = await this.getCurrency('d5300451d2e82d6fecb8a504865962d5');
    const currencyArr = this.getFormattedCurrency(rawCurrencyArr);
    const currencyList = Object.keys(currencyArr);
    this.setState({ currencyArr, currencyList });
  }

  async getCurrency(token: string) {
    return fetch(`http://apilayer.net/api/live?access_key=${token}&format=1`)
      .then(response => response.json())
      .then(data => (data.quotes))
      .catch(error => console.log(error));
  }

  getFormattedCurrency(arr: any) {
    const currencyArr: any = { USD: 1 };
    const arrKeys: any = Object.keys(arr);
    for (const el of arrKeys) {
      currencyArr[el.slice(3)] = arr[el];
    }
    return currencyArr;
  }

  onSelectChange = (currency: string, id: number) => {
    const data = [...this.state.data];
    data[id].currency = currency;
    this.setState({ data });
  }

  onInputChange = (val: number, id: number) => {
    console.log(val, id);
  }

  render() {
    const { currencyList } = this.state;
    return (
      <React.Fragment>
        <Select options={currencyList} id={0} onSelectChange={this.onSelectChange} />
        <Input id={0} onInputChange={this.onInputChange} />
        <Select options={currencyList} id={1} onSelectChange={this.onSelectChange} />
        <Input id={1} onInputChange={this.onInputChange} />
      </React.Fragment>
    );
  }
}

export default App;
