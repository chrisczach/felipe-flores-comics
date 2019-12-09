import React, { useState, useEffect } from 'react';
import Img from 'gatsby-image'
import { makeStyles, Modal, Backdrop, Paper, Fade, Button } from '@material-ui/core';
const useStyles = (portrait) => makeStyles( theme => ( {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  window: {
    width: `calc(100vw - ${theme.spacing(5)}px)`,
    height: `calc(100vh - ${ theme.spacing( 5 ) }px)`,
    // flexDirection: portrait ? 'column' : 'row',
  },
  image: {
    display: 'inline-block',
    height: '100%',
    // Need to figure out what's going on here.
    width: '50%',
  }
  // image: portrait ? {
  //   width: '100%',
  // } : {
  //     height: '100%',
  // }
} ) )

const useProjectPreviewModal = (props) => {

  const [ modalData, setModalData ] = useState( {} )


  
  const openHandler = ( {title, excerpt, slug, fluid, aspectRatio,handleNavigate} ) => setModalData( {title,excerpt,slug,fluid,aspectRatio,handleNavigate} )
  const closeHandler = () => setModalData( {} )
  
  const { title, excerpt, slug, fluid, aspectRatio, handleNavigate } = modalData
  
  const [ screenAspect, setScreenAspect ] = useState( 1 )
  
  const portrait = screenAspect < aspectRatio

const updateScreen = () => setScreenAspect(window.innerWidth/window.innerHeight)
useEffect(() => {
  updateScreen()
  window.addEventListener('resize', updateScreen)
  return () => {
    window.removeEventListener('resize', updateScreen)
  };
}, [ updateScreen ] )
  
  const classes = useStyles(portrait)( props )
  
  const previewModal = (
    <Modal aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={Object.entries(modalData).length}
      onClose={ closeHandler }
    className={classes.root}
    >
      <Paper square className={ classes.window }>
        <Img fluid={ fluid }
          objectFit='contain'
          className={ classes.image }
        /> 
       
      </Paper>

        </Modal>)
  return ({openHandler, previewModal})
}

export default useProjectPreviewModal