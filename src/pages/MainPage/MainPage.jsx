import BasicLayout from "../../layouts/BasicLayout";
import React, { createContext, useState } from 'react';
//import CarouselComponent from "../components/CarouselComponent";
//import SidebarContent from "../components/SidebarContent";
import { Sidebar, Banners } from "../data";

import Body from "./Body";

const MainPage = () => {
    return (
        <>
            {/* <Sidebar >
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
            </Sidebar > */}
            <BasicLayout>
                {/* <CarouselComponent /> */}
                <Body />
            </BasicLayout>
        </>
    );
}

export default MainPage;