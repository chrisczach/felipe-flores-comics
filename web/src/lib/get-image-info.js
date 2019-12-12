import { useContext } from 'react';
import { AssetsContext } from '../containers/layout';

export const getImageInfo = ( { _ref } ) => {
  const { edges } = useContext( AssetsContext );
  const { node: { localFile: { childImageSharp: { fluid }, }, metadata: { dimensions: { aspectRatio }, }, }, } = edges.find( ( { node: { _id } } ) => _id === _ref );
  return { fluid, aspectRatio};
};
