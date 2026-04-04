import React, { FC } from "react";
import Navbar from "../lib/NavBar";
import HeroSection from "../lib/Hero";
import FooterSection from "../lib/Footer";

interface Props { }

const HomePage: React.FC<Props> = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FooterSection />
        </>
    )
}

export default HomePage;