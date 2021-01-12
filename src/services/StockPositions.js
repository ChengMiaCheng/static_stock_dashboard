import React, { Component } from "react";
import {
  iex,
  stockPositionTable_numRows,
  stockPositionTable_columns,
} from "../config/config.js";

import "../styles/style.css";

import BootstrapTable from "react-bootstrap-table-next";

export class StockPositions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stocks: [],
    };
  }

  async componentDidMount() {
    const url = `https://api.allorigins.win/raw?url=${iex.base_url}/stock/market/list/${this.props.list_type}?token=${iex.api_token}`;

    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      this.setState({
        stocks: data,
        loading: false,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <div>loading....</div>;
    }

    if (!this.state.stocks) {
      return <div>didn't get a stock</div>;
    }

    return <StockTable name={this.props.name} stocks={this.state.stocks} />;
  }
}

const StockTable = (props) => {
  const numFetchedStocks = props.stocks.length;
  const name = props.name;
  const key = stockPositionTable_columns[0].dataField;

  if (numFetchedStocks > 0) {
    const stocks =
      numFetchedStocks > stockPositionTable_numRows
        ? props.stocks.slice(0, stockPositionTable_numRows)
        : props.stocks;
    return (
      <div>
        <p>{name}</p>
        <BootstrapTable
          keyField={key}
          data={stocks}
          columns={stockPositionTable_columns}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div>{name}</div>
        <h3>No qualified stocks yet</h3>
      </div>
    );
  }
};

export default StockPositions;
