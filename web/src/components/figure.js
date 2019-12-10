import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image';

const getImageFluid = ({_ref, edges}) =>edges.find( ( { node: { _id } } ) => _id === _ref ).node.localFile.childImageSharp.fluid

export default ({ node }) => {
  if (!node.asset) {
    return null;
  }
//  node.asset._ref is format image-b153e57ac80ef6f7272d730c3521bff4b1e7f3b8-1500x1001-png
  const { asset: { _ref } } = node
  
const {assets:{edges}} = useStaticQuery(query)

  const fluid = getImageFluid( { _ref, edges } )
  
  return (
    <figure>
      <Img fluid={fluid} alt={node.alt} />
      {node.caption && <figcaption>{node.caption}</figcaption>}
    </figure>
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
`