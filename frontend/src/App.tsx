import React, { useEffect } from "react";
import "./App.css";
import { Header } from "./components/layout/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Footer } from "./components/layout/Footer/Footer";
import { Home } from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Header />
      <Route path="/">
        <Home />
      </Route>
      <Footer />
    </Router>
  );
}

export default App;
