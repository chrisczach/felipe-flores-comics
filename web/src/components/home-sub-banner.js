import React from 'react';

import { makeStyles, Box } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { getImageInfo } from '../lib/get-image-info';

const useStyle = makeStyles(theme => {
  return {
    wrapper: {
      overflow: 'hidden',
      background: theme.palette.secondary.main,
      position: 'absolute',
      top: '50vh',
      height: `calc(40vh + ${theme.spacing(1)}px)`,
      width: '100%',
      clipPath: `polygon(94% 85%, 100% 100%, 100% 0%, 0% 0%, 0% 100%, 4% 86%, 12% 92%, 14% 81%, 20% 90%, 21% 77%, 28% 87%, 31% 74%, 40% 85%, 44% 70%, 48% 83%, 54% 69%, 56% 78%, 62% 72%, 63% 84%, 70% 76%, 73% 89%, 79% 76%, 84% 94%)`,
      WebkitClipPath: `polygon(94% 85%, 100% 100%, 100% 0%, 0% 0%, 0% 100%, 4% 86%, 12% 92%, 14% 81%, 20% 90%, 21% 77%, 28% 87%, 31% 74%, 40% 85%, 44% 70%, 48% 83%, 54% 69%, 56% 78%, 62% 72%, 63% 84%, 70% 76%, 73% 89%, 79% 76%, 84% 94%)`,
    },
    imageWrap: {
      position: 'relative',
      left: theme.spacing(-2),
      transform: `translateY(${theme.spacing(-1)}px) translateX(${theme.spacing(
        2,
      )}px)`,
      overflow: 'hidden',
      height: `calc(40vh + ${theme.spacing(1)}px)`,
      clipPath: `polygon(94% 85%, 100% 100%, 100% 0%, 0% 0%, 0% 100%, 4% 86%, 12% 92%, 14% 81%, 20% 90%, 21% 77%, 28% 87%, 31% 74%, 40% 85%, 44% 70%, 48% 83%, 54% 69%, 56% 78%, 62% 72%, 63% 84%, 70% 76%, 73% 89%, 79% 76%, 84% 94%)`,
      WebkitClipPath: `polygon(94% 85%, 100% 100%, 100% 0%, 0% 0%, 0% 100%, 4% 86%, 12% 92%, 14% 81%, 20% 90%, 21% 77%, 28% 87%, 31% 74%, 40% 85%, 44% 70%, 48% 83%, 54% 69%, 56% 78%, 62% 72%, 63% 84%, 70% 76%, 73% 89%, 79% 76%, 84% 94%)`,
    },
  };
});

const HomeSubBanner = ({ ...props }) => {
  const classes = useStyle(props);

  const {
    site: {
      title,
      subtitle,
      headingImage: {
        asset: { _ref },
      },
    },
  } = useStaticQuery(query);

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.imageWrap}>
        <Img fluid={getImageInfo({ _ref }).fluid} />
      </Box>
    </Box>
  );
};

const query = graphql`
  query SubHeadingQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      subtitle
      headingImage {
        asset {
          _ref: _id
        }
      }
    }
  }
`;

export default HomeSubBanner;
