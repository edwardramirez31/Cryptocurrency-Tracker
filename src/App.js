import { Layout, Space, Typography } from "antd";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import {
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
  Homepage,
  Navbar,
  News,
} from "./components";
import LoginForm from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Layout.Content style={{ margin: "0 25px" }}>
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route exact path="/exchanges">
                  <Exchanges />
                </Route>
                <ProtectedRoute
                  component={Cryptocurrencies}
                  exact
                  path="/cryptocurrencies"
                />
                <Route exact path="/crypto/:id">
                  <CryptoDetails />
                </Route>
                <Route exact path="/news">
                  <News />
                </Route>
                <Route exact path="/login">
                  <LoginForm />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
              </Switch>
            </Layout.Content>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Copyright © 2021 <Link to="/">CryptoTracker</Link> <br />
            All Rights Reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
