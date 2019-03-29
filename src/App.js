import React, { Component } from 'react';
import ChangeCurrency from './ChangeCurrency';
import './App.css';

const CUR_EXCHANGE_SERVICE = 'https://api.exchangeratesapi.io/latest';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: 'EUR',
      priceData: []
    };
    this.currencyList = ["EUR", "BGN", "USD", "ILS", "RUB", "CAD", "INR", "PHP", "CHF", "ZAR", "AUD", "JPY"];
  }

  componentDidMount = () => {
    // Intially Collect data from service
    this._getData();
  }

  // Making the service call and retieving data
  _getData = () => {
    const { baseCurrency } = this.state;
    fetch(CUR_EXCHANGE_SERVICE + '?base=' + baseCurrency)
      .then(response => response.json())
      .then(data => {
        if (data && data.rates) {
          data.rates[baseCurrency] = 1;
          this.setState({ priceData: data.rates });
        }
      });
  }

  // Header section of the table
  _showHeader = () => {
    const { currencyList, state } = this;
    const { baseCurrency } = state;
    return (
      <tr>
        {currencyList && currencyList.map( cl => {
          return (<th className={ cl === baseCurrency ? 'active' : ''}>{cl}</th>);
        })}
      </tr>
    );
  }

  // Content section of the table
  _showContent = () => {
    const { priceData } = this.state;
    const { currencyList } = this;
    return priceData && (
      <tr>
        {
          currencyList.map((pd) => {
            return <td>{parseFloat(priceData[pd]).toFixed(4)}</td>;
          })
        }
      </tr>
    );
  }

  _onSelectCurrency = (val) => {
    const { value } = val;
    this.setState({ baseCurrency: value }, () => {
      this._getData();
    });
  }

  render() {
    return (
      <div className="currency-app">
        <ChangeCurrency
          currencyList= {this.currencyList}
          baseCurrency = {this.state.baseCurrency}
          onSelect= {this._onSelectCurrency}
        />
        <table>
          <thead>
            {this._showHeader()}
          </thead>
          <tbody>
            {this._showContent()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
