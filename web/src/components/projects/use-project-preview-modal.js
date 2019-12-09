import React,{useState} from 'react';
import { makeStyles, Modal, Backdrop, Paper, Fade, Button } from '@material-ui/core';
const useStyles = makeStyles( theme => ( {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  window: {
    width: '80vw',
    height: '80vh',
  }
} ) )

const useProjectPreviewModal = (props) => {
  const classes = useStyles(props)
  const [modalData, setModalData] = useState({})
  const openHandler = ( {title, excerpt, slug, fluid,handleNavigate} ) => setModalData( {title,excerpt,slug,handleNavigate} )
  const closeHandler = () => setModalData({})
  const previewModal = (
    <Modal aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={Object.entries(modalData).length}
      onClose={ closeHandler }
    className={classes.root}
    >
      <Paper className={classes.window}><Button onClick={modalData.handleNavigate}>{ JSON.stringify( modalData ) }</Button></Paper>

        </Modal>)
  return ({openHandler, previewModal})
}

export default useProjectPreviewModal