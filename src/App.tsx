import "./scss/app.scss";
import Loadable from "react-loadable"
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const Cart = Loadable({
    loader: () => import('./pages/Cart'), loading: () => <div> Загрузка... </div>,
});
// const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'))
const FullPizza = Loadable({
    loader: () => import('./pages/FullPizza'), loading: () => <div> Загрузка... </div>,
});

function App() {
    return (<Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/pizza/:id" element={<FullPizza/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>);
}

export default App;
