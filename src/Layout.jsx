import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    return(
        <div className="flex-col h-screen">
            <Header/>
            <Footer/>
            <Outlet/>
        </div>
    )
}