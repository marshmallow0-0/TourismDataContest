import BasicLayout from "../layouts/BasicLayout";
import React, { createContext, useState } from 'react';
import CarouselComponent from "../components/CarouselComponent";
import MainBody from "../layouts/MainBody";
import Sidebar from "../components/Sidebar";
import SidebarContent from "../components/SidebarContent";
import { Banners } from "./data";


const MainPage = () => {
    return (
        <>
            <Sidebar >
                <SidebarContent
                    image={Banners[1].image}
                    title="Incheon"
                    subtitle="CentralPark"
                />
                <SidebarContent
                    image="./img/LotteTower.jpg"
                    title="Seoul"
                    subtitle="LotteTower"
                />
            </Sidebar >
            <BasicLayout>
                <CarouselComponent />
                <MainBody />
            </BasicLayout>
        </>
    );
}

export default MainPage;