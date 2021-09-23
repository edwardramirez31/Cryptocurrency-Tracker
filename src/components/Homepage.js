import { Col, Row, Statistic, Typography } from "antd";
import millify from "millify";
import React from "react";
import { Link } from "react-router-dom";
import { useGetCoinsQuery } from "../app/services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
const { Title } = Typography;

const HomePage = () => {
  const { data } = useGetCoinsQuery(9);
  const homeData = data?.data?.stats;

  if (homeData) {
    return (
      <>
        <Title level={2} className="heading">
          Global Crypto Stats
        </Title>
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Statistic title="Base Currency" value={`$${homeData.base}`} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Exchanges"
              value={homeData.totalExchanges}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Market Cap:"
              value={`$${millify(homeData.totalMarketCap)}`}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total 24h Volume"
              value={`$${millify(homeData.total24hVolume)}`}
            />
          </Col>
          <Col span={12}>
            <Statistic title="Total Cryptocurrencies" value={homeData.total} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Markets"
              value={millify(homeData.totalMarkets)}
            />
          </Col>
        </Row>
        <div className="home-heading-container">
          <Title level={2} className="home-title">
            Top 10 Cryptos In The World
          </Title>
          <Title level={3} className="show-more">
            <Link to="/cryptocurrencies">Show more</Link>
          </Title>
        </div>
        <Cryptocurrencies simplified />
        <div className="home-heading-container">
          <Title level={2} className="home-title">
            Latest Crypto News
          </Title>
          <Title level={3}>
            <Link to="/news">Show more</Link>
          </Title>
        </div>
        <News simplified />
      </>
    );
  }

  return <h2>Loading...</h2>;
};

export default HomePage;
