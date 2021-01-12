import React, { Component } from "react";
import { iex } from "../config/iex.js";
import { Line } from "react-chartjs-2";

const ranges = ["7d", "1m", "ytd"];
export class StockPerformance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingChartData: true,
      chartData: null,
      range: "7d",
    };
  }

  async componentDidMount() {
    await this.fetchChartData();
  }

  async fetchChartData() {
    const url_chartData = `https://api.allorigins.win/raw?url=${iex.base_url}/stock/${this.props.symbol}/chart/${this.state.range}?token=${iex.api_token}`;
    console.log("Fetch chart data from:", url_chartData);
    const response_chartData = await fetch(url_chartData);

    if (response_chartData.status === 200) {
      const chartData = await response_chartData.json();

      this.setState({
        chartData: chartData,
        loadingChartData: false,
      });
    }
  }

  async updateChart(props) {
    const { selectedRange } = props;

    if (selectedRange === this.state.range) {
      console.log(
        `selected range "${selectedRange}" is same as the current range "${this.state.range}", do nothing`
      );
    } else {
      await this.setState({ range: selectedRange });
      await this.fetchChartData();
      console.log(`updated chart date range to ${this.state.range}`);
    }
  }

  render() {
    if (this.state.loadingChartData) {
      return <div>loading historical chart data....</div>;
    }

    if (!this.state.chartData) {
      return <div>didn't get historical stock close prices</div>;
    }

    return (
      <div>
        <div className="grid-container">
          {ranges.map((range) => {
            return (
              <div
                className="button"
                onClick={(e) => {
                  this.updateChart({ selectedRange: e.target.innerText });
                }}
              >
                {range}
              </div>
            );
          })}
        </div>

        <StockLineChart data={this.state.chartData} />
      </div>
    );
  }
}
const StockLineChart = (props) => {
  const { data } = props;

  const priceArr = data.map((d) => d.close);
  const labelArr = data.map((d) => d.label);
  const chartData = {
    labels: labelArr,
    datasets: [
      {
        data: priceArr,
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
      },
    ],
  };
  return (
    <div>
      <Line
        data={chartData}
        options={{
          title: {
            text: "Historical Close Prices",
            display: true,
          },
          legend: {
            display: false,
          },
        }}
      />
    </div>
  );
};

export default StockPerformance;
