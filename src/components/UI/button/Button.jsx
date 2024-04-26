import React from 'react';
import classes from './Button.module.css'

const Button = ({ children, className, ...props }) => {
  return (
    <button {...props} className={className ? classes.btn + ` ${className}` : classes.btn}>
      {children}
    </button>
  );
}

export default Button;
