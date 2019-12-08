import Figure from './figure';
import BlocksToMUI from './blocks-to-MUI';

const serializers = {
  types: {
    block: BlocksToMUI,
    figure: Figure,
  },
};

export default serializers;
