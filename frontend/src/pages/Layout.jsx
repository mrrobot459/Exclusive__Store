import React from 'react'
import NavBar from '../component/NavBar';
import { Outlet } from "react-router-dom";
import Footer from '../component/Footer';

const Layout = () => {
    return (
        <div className="m-0 p-0">
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />

        </div>
    )
}

export default Layout