import Figure from './figure/figure';
import BlocksToMUI from './blocks-to-MUI';

const serializers = {
  types: {
    block: BlocksToMUI,
    figure: Figure,
  },
};

export default serializers;
