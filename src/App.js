import "./styles/style.css";
import React, { Component } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StockCurrentPrice from "./services/StockCurrPrice";
import StockPerformance from "./services/StockPerformance";
import StockPositions from "./services/StockPositions";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="grid-container-3col">
          <StockCurrentPrice symbol="AAPL" />
          <StockCurrentPrice symbol="VIH" />
          <StockCurrentPrice symbol="GRNQ" />
        </div>
        <div className="grid-container-3col">
          <StockPerformance symbol="AAPL" />
          <StockPerformance symbol="VIH" />
          <StockPerformance symbol="GRNQ" />
        </div>
        <div className="grid-container-2col">
          <StockPositions name="Top 5 Performer Today" list_type="gainers" />
          <StockPositions name="Bottom 5 Performer Today" list_type="losers" />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
