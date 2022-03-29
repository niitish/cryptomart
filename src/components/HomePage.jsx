import { Typography, Row, Col, Statistic } from "antd";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import millify from "millify";
import { Link } from "react-router-dom";
import { Cryptos, News } from "./";

const { Title } = Typography;

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(9);

  if (isFetching) return "Loading...";
  const globalStats = data?.data?.stats;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={8}>
          <Statistic title="Total Cryptos" value={millify(globalStats.total)} />
        </Col>
        <Col span={8}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 12 Cryptos
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptos">Show More</Link>
        </Title>
      </div>
      <Cryptos simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default HomePage;
