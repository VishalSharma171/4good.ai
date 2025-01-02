import React from 'react';
import PropTypes from 'prop-types';

export function Button({ type = 'button', className = '', children, onClick, ...props }) {
  return (
    <button
      type={type}
      className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Define prop types to ensure proper usage
Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

// Default export, if needed
export default Button;
