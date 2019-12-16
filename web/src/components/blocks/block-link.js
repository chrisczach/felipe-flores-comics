import React from 'react';
import { Link } from '@material-ui/core';

const BlockLink = ({ mark: { href }, children }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      color="inherit"
      style={{ textDecoration: 'underline' }}
      variant="inherit"
    >
      {children}
    </Link>
  );
};

export default BlockLink;
