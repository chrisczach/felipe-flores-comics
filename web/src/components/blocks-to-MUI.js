import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({}));

const BlocksToMUI = props => {
  const styledClasses = useStyles(props);
  const style = props.node.style || 'normal';
  if (/^h\d/.test(style)) {
    const level = style.replace(/[^\d]/g, '');
    const variant = `h${parseInt(level)}`;
    return (
      <Typography
        // @ts-ignore
        variant={variant}
        color={variant === 'h1' ? 'textPrimary' : 'textSecondary'}
        gutterBottom
      >
        {props.children}
      </Typography>
    );
  }

  return style === 'blockquote' ? (
    <Typography variant="body1">{props.children}</Typography>
  ) : (
    <Typography variant="body1">{props.children}</Typography>
  );
};

export default BlocksToMUI;
