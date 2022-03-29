import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { Layout, Typography, Space } from "antd";
import {
  Header,
  HomePage,
  Exchanges,
  Cryptos,
  CryptoDetails,
  News,
} from "./components";
import "antd/dist/antd.min.css";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Header />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route exact path="/cryptos" element={<Cryptos />} />
              <Route
                exact
                path="/cryptos/:coinID"
                element={<CryptoDetails />}
              />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: "white" }}>
            © Crypto Mart
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/cryptos">Cryptocurrencies</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
