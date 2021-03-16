import React from "react";

const Conditional = ({condition, primary, secondary, ...otherProps}) => {
    const toRender = condition() ? primary : secondary;

    if(React.isValidElement(toRender)) {
        return React.cloneElement(toRender, {...otherProps});
    }
    return toRender;
}
 
export default Conditional;