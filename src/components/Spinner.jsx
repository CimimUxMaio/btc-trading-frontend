import React from "react";
import BootstrapSpinner from "react-bootstrap/Spinner";

function Spinner(props) {
    return (
        <BootstrapSpinner animation="border" variant="secondary" role="status" style={{marginTop: "5%"}}>
            <span className="sr-only">Loading...</span>
        </BootstrapSpinner>
    );
}


export default Spinner;