import React from "react";

const Lazy = (props) => {
    const evaluatedComponent = props.component()
    return React.isValidElement(evaluatedComponent) ? React.cloneElement(evaluatedComponent, {...props}) : evaluatedComponent;
}
 
export default Lazy;