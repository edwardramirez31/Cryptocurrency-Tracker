import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCoinsQuery } from "../app/services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const {
    data: cryptoData,
    error,
    isFetching,
  } = useGetCoinsQuery(simplified ? 9 : 99);

  useEffect(() => {
    const coins = cryptoData?.data?.coins;
    const filterCoins = coins.filter((item) => {
      return item.name.toLowerCase().includes(search);
    });
    setCryptos(filterCoins);
    return () => {
      console.log("cleanup");
    };
  }, [cryptoData, search]);
  if (isFetching) {
    return <h2>Loading</h2>;
  }
  console.log(cryptoData);
  return (
    <>
      {!simplified && (
        <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link key={currency.id} to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
