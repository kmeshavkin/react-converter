import * as React from 'react';
import Select from './Select/Select';
import Input from './Input/Input';
import Button from './Button/Button';
import './App.css';

interface MyState {
  currencyList: Array<string>,
  currencyRate: { [s: string]: number },
  data: [
    { currency: string, value: string },
    { currency: string, value: string }
  ]
};

class App extends React.Component<any, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currencyList: [],
      currencyRate: {},
      data: [
        { currency: 'USD', value: '1' },
        { currency: 'USD', value: '1' }
      ]
    };
  }

  async componentDidMount() {
    const rawCurrencyArr = await this.getCurrency('d5300451d2e82d6fecb8a504865962d5');
    const currencyRate = this.getFormattedCurrency(rawCurrencyArr);    
    const currencyList = Object.keys(currencyRate);
    this.setState({ currencyRate, currencyList });
  }

  async getCurrency(token: string) {
    return fetch(`http://apilayer.net/api/live?access_key=${token}&format=1`)
      .then(response => response.json())
      .then(data => (data.quotes))
      .catch(error => console.log(error));
  }

  getFormattedCurrency(arr: any): {} {
    const currencyRate: any = { USD: 1 };
    const arrKeys: any = Object.keys(arr);
    for (const el of arrKeys) {
      currencyRate[el.slice(3)] = arr[el];
    }
    return currencyRate;
  }

  setCurrency = (id: number, currency: string): void => {
    const data = [...this.state.data];
    data[id] = { ...data[id]};
    data[id].currency = currency;
    this.setState({ data: [data[0], data[1]] });
  }

  setValues = (id: number, value: string): void => {
    const data = [...this.state.data];
    data[id] = { ...data[id] };
    data[id].value = value;
    this.setState({ data: [data[0], data[1]] });
  }

  recountRate = (): void => {
    const fromCurrency = this.state.data[0].currency;
    const toCurrency = this.state.data[1].currency;
    const rate = this.state.currencyRate[toCurrency] / this.state.currencyRate[fromCurrency];
    const data = [...this.state.data];
    data[1] = { ...data[1] };
    const parsedValue = parseFloat(data[0].value);
    data[1].value = (parsedValue * rate).toFixed(2);
    this.setState({ data: [data[0], data[1]] });
  }

  render() {
    const { currencyList } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="from">
            <Select options={currencyList} id={0} onSelectChange={this.setCurrency} />
            <Input id={0} value={this.state.data[0].value} onInputChange={this.setValues} />
          </div>
          <div className="to">
            <Select options={currencyList} id={1} onSelectChange={this.setCurrency} />
            <Input id={1} value={this.state.data[1].value} onInputChange={this.setValues} />
          </div>
        </div>
        <Button onButtonClick={this.recountRate}/>
      </React.Fragment>
    );
  }
}

export default App;
