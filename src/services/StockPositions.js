import React, { Component } from "react";
import { iex } from "../config/iex.js";
import Table from "../components/Table";
import { num_rows, col_names } from "../config/table";
import "../styles/style.css";

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

  if (numFetchedStocks > 0) {
    if (numFetchedStocks > num_rows) {
      const stocks = props.stocks.slice(0, num_rows);
      return <Table name={name} headers={col_names} rows={stocks} />;
    } else {
      return <Table name={name} headers={col_names} rows={props.stocks} />;
    }
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
