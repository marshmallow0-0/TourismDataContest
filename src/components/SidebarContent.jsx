import React from "react";

const SidebarContent = ({ image, title, subtitle }) => {
    return (
        <div className="group relative mb-10 flex h-60 w-64 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
            <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                <img src={image} className="animate-fade-in block h-full w-fulldl scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110" alt="" />
            </div>
            <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                <h1 className="font-serif text-2xl font-bold text-white shadow-xl">{title}</h1>
                <h1 className="text-sm font-light text-gray-200 shadow-xl">{subtitle}</h1>
            </div>
        </div>
    );
};

export default SidebarContent;