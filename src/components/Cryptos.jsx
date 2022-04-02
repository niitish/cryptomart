import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import { useEffect, useState } from "react";

const Cryptos = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [searchTerm, cryptosList]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((curr, i) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={i}>
            <Link to={`/cryptomart/cryptos/${curr.uuid}`}>
              <Card
                id={i}
                title={`${curr.rank}. ${curr.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={curr.iconUrl}
                    alt={`${curr.name}`}
                    style={{
                      maxWidth: "35px",
                      maxHeight: "35px",
                    }}
                  />
                }
                hoverable
              >
                <p>Price: {millify(curr.price)}</p>
                <p>Market Cap: {millify(curr.marketCap)}</p>
                <p>Daily Change: {millify(curr.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptos;
