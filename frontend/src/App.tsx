import "./App.css";
import { Header } from "./components/layout/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./components/layout/Footer/Footer";
import { Home } from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import { Products } from "./components/Product/Products";
import { Search } from "./components/Product/Search";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
