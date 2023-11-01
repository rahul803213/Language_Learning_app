import React from "react";

import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn,inverted,yellow,...otherProps}) =>{
    return(
       <button className={`custom-button  ${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''}  ${yellow ? 'yellow' : ''}` }  {...otherProps}>
{children}
       </button>
    )
}
export default CustomButton;