import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Row, Col, Typography } from "antd";
import millify from "millify";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (var i = coinHistory?.data?.history?.length - 1; i >= 0; i--) {
    coinPrice.push(coinHistory.data.history[i].price);
    var ts = coinHistory.data.history[i].timestamp;
    var dt = new Date(0);
    dt.setUTCSeconds(ts);
    coinTimeStamp.push(dt.toLocaleDateString());
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price (USD)",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = { scales: { y: { ticks: { beginAtZero: true } } } };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current price: ${millify(currentPrice)}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
