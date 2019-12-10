import React, { useState, useEffect,useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import {
  makeStyles,
} from '@material-ui/core';

import FigureModal from './figure-modal';
import { ModalUpdater } from '../layout'

const getImageInfo = ({ _ref, edges }) =>{
  const {node:{localFile: {childImageSharp:{fluid}}, metadata:{dimensions: {aspectRatio}}} } = edges.find( ( { node: { _id } } ) => _id === _ref )
return {fluid, aspectRatio}
}

const useStyles = (float = false) => makeStyles( theme => ( {
  root: {
    display: 'block',
    margin: theme.spacing( 2, 0 ),
    [ theme.breakpoints.up( 'md' ) ]: {
      margin: `${theme.spacing(2)}px auto`,
      width: float ? '60%' : '75%',
      float: float || 'none '
    }
  }
}))

export default ({ node,...props }) => {
  if (!node.asset) {
    return null;
  }
//  Need to figure out how to handle float images
  const classes = useStyles(false && node.float)(props)
  const {
    asset: { _ref },
  } = node;

  const {
    assets: { edges },
  } = useStaticQuery(query);
  const {fluid, aspectRatio} = getImageInfo( { _ref, edges } );
  
  const modalUpdater = useContext( ModalUpdater )
  const openHandler = () => modalUpdater( { children: <FigureModal {...{fluid, aspectRatio, closeHandler: ()=> modalUpdater({open: false, children: null})} }/>})
  return (
    <>
      <figure onClick={openHandler} className={classes.root}>
        <Img fluid={fluid} alt={node.alt} />
        {node.caption && <figcaption>{node.caption}</figcaption>}
      </figure>
    </>
  );
};

const query = graphql`
  query BlockImageQuery {
    assets: allSanityImageAsset {
      edges {
        node {
          _id
                      metadata {
              dimensions {
                aspectRatio
              }
            }
          localFile(width: 2400) {
            childImageSharp {
              fluid(
                maxWidth: 2400
                traceSVG: { color: "#8b151b77", background: "#ffd83111" }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
