import React, { useEffect, useState } from "react";
import { iex } from "../config/iex.js";
import axios from "axios";

const StockCurrPrice = (props) => {
  const { symbol } = props;
  const [currPrice, setCurrPrice] = useState(0);
  let prevPrice = currPrice;
  useEffect(() => {
    const fetchData = async () => {
      const url_price = `https://api.allorigins.win/raw?url=${iex.base_url}/stock/${symbol}/quote/latestPrice?token=${iex.api_token}`;
      console.log(url_price);
      const result = await axios(url_price);
      console.log(symbol, result.data);
      setCurrPrice(result.data);
    };

    fetchData();
  }, [currPrice]);

  return (
    <CurrentPrice symbol={symbol} prePrice={prevPrice} currPrice={currPrice} />
  );
};

const CurrentPrice = (props) => {
  const { symbol, isIncreased, currPrice } = props;
  console.log(symbol, currPrice);
  if (isIncreased) {
    <div className="grid-container">
      <div>{symbol}</div>
      <div>{currPrice}</div>
      <div className="arrow-up" />
    </div>;
  } else {
    return (
      <div className="grid-container">
        <div>{symbol}</div>
        <div>Current Price: {currPrice}</div>
        <div className="arrow-down" />
      </div>
    );
  }
};
export default StockCurrPrice;
