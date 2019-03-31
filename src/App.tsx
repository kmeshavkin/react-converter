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
    const rawCurrencyArr = await this.getCurrency('here was my old key, provide your own here');
    if (rawCurrencyArr == null) throw new Error('Currency rates were not fetched correctly from apilayer.net.\r\nCheck your connection, website availability and your token');
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

  recountRate = (): void => {
    const fromCurrency = this.state.data[0].currency;
    const toCurrency = this.state.data[1].currency;
    const rate = this.state.currencyRate[toCurrency] / this.state.currencyRate[fromCurrency];
    const parsedValue = parseFloat(this.state.data[0].value);
    this.setStateData(1, undefined, (parsedValue * rate).toFixed(2));
  }

  setStateData = (id: number, currency: string | undefined, value: string | undefined): void => {
    const data = [...this.state.data];
    data[id] = { ...data[id] };
    if (typeof value != 'undefined') data[id].value = value;
    if (typeof currency != 'undefined') data[id].currency = currency;
    this.setState({ data: [data[0], data[1]] });
  }

  render() {
    const { currencyList } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="from">
            <Select options={currencyList} id={0} onChange={this.setStateData} />
            <Input id={0} value={this.state.data[0].value} onChange={this.setStateData} />
          </div>
          <div className="to">
            <Select options={currencyList} id={1} onChange={this.setStateData} />
            <Input id={1} value={this.state.data[1].value} onChange={this.setStateData} />
          </div>
        </div>
        <Button onButtonClick={this.recountRate}/>
      </React.Fragment>
    );
  }
}

export default App;
