import Figure from './figure/figure';
import BlocksToMUI from './blocks-to-MUI';
import BlockLink from './blocks/block-link';

const serializers = {
  types: {
    block: BlocksToMUI,
    figure: Figure,
  },
  marks: {
    link: BlockLink,
  },
};

export default serializers;
