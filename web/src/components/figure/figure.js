import React, { useState, useEffect,useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import FigureModal from './figure-modal';
import { ModalUpdater } from '../layout'

const getImageFluid = ({ _ref, edges }) =>
  edges.find(({ node: { _id } }) => _id === _ref).node.localFile.childImageSharp
    .fluid;

export default ({ node }) => {
  if (!node.asset) {
    return null;
  }

  const {
    asset: { _ref },
  } = node;

  const {
    assets: { edges },
  } = useStaticQuery(query);
  const fluid = getImageFluid( { _ref, edges } );
  
  const modalUpdater = useContext( ModalUpdater )
  const openHandler = () => modalUpdater( { children: <FigureModal {...{fluid, aspectRatio: 1, closeHandler: ()=> modalUpdater({open: false, children: null})} }/>})
  return (
    <>
      <figure onClick={openHandler}>
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
