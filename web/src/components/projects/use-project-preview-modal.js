import React,{useState} from 'react';
import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core';

const useProjectPreviewModal = () => {
  const openHandler = ( stuff ) => alert(JSON.stringify(stuff))
  const PreviewModal = () => <div>Preview Modal</div>
  return ({openHandler, PreviewModal})
}

export default useProjectPreviewModal