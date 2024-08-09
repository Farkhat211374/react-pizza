import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import React from "react";

export const AppContext = React.createContext("");

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const [pageIndex, setPageIndex] = React.useState(1);

  return (
    <div className="wrapper">
      <AppContext.Provider
        value={{
          searchValue,
          setSearchValue,
          pageIndex,
          setPageIndex,
        }}
      >
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
