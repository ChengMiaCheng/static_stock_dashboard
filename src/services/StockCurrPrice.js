import React, { useEffect, useState } from "react";
import { iex } from "../config/iex.js";
import axios from "axios";

const StockCurrPrice = (props) => {
  const { symbol } = props;
  const url_price = `${iex.base_url}/stock/${symbol}/quote/latestPrice?token=${iex.api_token}`;
  const [currPrice, setCurrPrice] = useState(0);
  let prevPrice = null;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url_price);

      setCurrPrice(result.data);
    };

    fetchData();
  }, [url_price]);

  return (
    <CurrentPrice symbol={symbol} prePrice={prevPrice} currPrice={currPrice} />
  );
};

const CurrentPrice = (props) => {
  const { symbol, isIncreased, currPrice } = props;

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
