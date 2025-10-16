import { Body } from "../components/Body";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return(
        <>
        <Navbar/>
        <main>
        <Outlet/>
        </main>
        <Footer/>
        </>
    );
};