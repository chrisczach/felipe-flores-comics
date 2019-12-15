import React from 'react';
import { Link } from '@material-ui/core';
import { Link as GatsbyLink } from 'gatsby';

const BlockInternalLink = ({ mark, children }) => {
  const {
    reference: {
      _type,
      slug: { current: slug },
    },
  } = mark;

  return (
    <Link
      component={GatsbyLink}
      to={`${_type !== 'page' ? '/portfolio' : ''}/${slug}/`}
      color="inherit"
      style={{ textDecoration: 'underline' }}
      variant="inherit"
    >
      {children}
    </Link>
  );
};

export default BlockInternalLink;
