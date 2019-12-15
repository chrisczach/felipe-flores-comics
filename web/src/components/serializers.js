import Figure from './figure/figure';
import BlocksToMUI from './blocks-to-MUI';
import BlockLink from './blocks/block-link';
import BlockInternalLink from './blocks/block-internal-link';

const serializers = {
  types: {
    block: BlocksToMUI,
    figure: Figure,
  },
  marks: {
    link: BlockLink,
    internalLink: BlockInternalLink,
  },
};

export default serializers;
