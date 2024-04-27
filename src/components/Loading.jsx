import React from "react";
//import Spinner from "./Spinner";
import { Oval } from "react-loader-spinner";

const Loading = () => {
    return (
        <div>
            <h3>Loading.....</h3>
            <br />
            <Oval />
            {/* <Spinner type="BarLoader" /> */}

        </div>
    )
}

export default Loading;