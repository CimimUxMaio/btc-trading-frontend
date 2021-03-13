import React from "react";

const Conditional = ({condition, primary: Primary, secondary: Secondary, ...otherProps}) => {
    return condition() ? <Primary {...otherProps}/> : <Secondary {...otherProps}/>;
}
 
export default Conditional;