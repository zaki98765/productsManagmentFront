import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"
import Prd from "./pages/Prd"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import AddProduct from "./pages/AddProduct"
import Product from "./pages/Product"
import Prf from "./pages/Prf"
function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Prd />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/AddP" element={<AddProduct />} />
        <Route path="/*" element={<Prf/>} />

      </Routes>
      <Footer />

    </>
  )
}

export default App
