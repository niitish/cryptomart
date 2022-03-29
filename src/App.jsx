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
              <Route exact path="/cryptomart" element={<HomePage />} />
              <Route
                exact
                path="/cryptomart/exchanges"
                element={<Exchanges />}
              />
              <Route exact path="/cryptomart/cryptos" element={<Cryptos />} />
              <Route
                exact
                path="/cryptos/:coinID"
                element={<CryptoDetails />}
              />
              <Route exact path="/cryptomart/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: "white" }}>
            © Crypto Mart
          </Typography.Title>
          <Space>
            <Link to="/cryptomart">Home</Link>
            <Link to="/cryptomart/exchanges">Exchanges</Link>
            <Link to="/cryptomart/cryptos">Cryptocurrencies</Link>
            <Link to="/cryptomart/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
