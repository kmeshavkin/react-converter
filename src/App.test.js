import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';

describe('App', () => {

  let component;

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  beforeEach(() => {
    component = renderer.create(<App />).getInstance();
  })

  it('converts raw currency arr to usable', () => {
    let retValue = component.getFormattedCurrency({ USDAAA: 3, USDBBB: 2 });
    expect(retValue).toMatchObject({ USD: 1, AAA: 3, BBB: 2 });
  });
});