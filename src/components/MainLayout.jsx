import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";
const MainLayout = ( { usuario }) => {
    return (
        <>
            <Header >
                <Nav usuario={ usuario} />  
            </Header >
            <Outlet />

            <Footer descripcion=" Bunaster |Agus Pavón" />
        </>
    )
}
export default MainLayout
