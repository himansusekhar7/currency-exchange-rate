import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChangeCurrency extends Component {
  constructor(props) {
    super(props);
  }
  
  _optionSelect = (event) => {
    const { onSelect } = this.props;
    const optionVal = (event.target && event.target.value);
    if (onSelect) {
      onSelect({ value: optionVal });
    }
  };

  render() {
    const { baseCurrency, currencyList } = this.props;
    if (baseCurrency && currencyList.indexOf(baseCurrency) < 0) {
      currencyList.push(baseCurrency);
    }

    return (
      <div className="currency-change">
        Select Base Currency : 
        <select
          value={baseCurrency}
          name="cur_change"
          id="cur-change"
          onChange={this._optionSelect}
        >
          {
            currencyList.map( cl => {
              return (<option value={cl} key={cl} >{cl}</option>);
            })
          }
        </select>
      </div>
    );
  }
}

ChangeCurrency.propTypes = {
  baseCurrency: PropTypes.string,
  currencyList: PropTypes.array,
  onSelect: PropTypes.func
};

export default ChangeCurrency;
