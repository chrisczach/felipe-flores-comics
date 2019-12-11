import React from 'react'
import { Box,makeStyles } from '@material-ui/core'

const useStyles = makeStyles( theme => ( {
  root: {
    margin: `${ theme.spacing( 2 ) }px auto`,
  }
}))
const ContainedDiv = ( { aspectRatio = 1, children, ...props } ) => {
  const classses = useStyles(props)
  const width = 500
  return (
    <Box style={{width}} className={classses.root}>
      Contained to aspect {aspectRatio}
      {children}
    </Box>
  )
}

export default ContainedDiv
