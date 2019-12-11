import React, { createContext, useState } from 'react';
import {
  useTheme,
  makeStyles,
  Modal,
  Backdrop,
  Typography,
  Paper,
  Fade,
  Button,
  Zoom,
} from '@material-ui/core';

import Nav from './nav';
import Footer from './footer';
import PageTransition from './page-transition';
import './layout.module.css';

export const ModalUpdater = createContext(() => null);

export const SiteLinksContext = createContext([]);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: `blur(4px) brightness(1.25) saturate(0.75)`,
  },
}));

const Layout = ({
  location,
  children,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  siteLinks,
  siteSubtitle,
  siteFooter,
  ...props
}) => {
  const classes = useStyles(props);
  const [modalData, setModalData] = useState({ open: false, children: null });
  const modalUpdater = ({ open = true, children }) => {
    setModalData({ open, children });
  };
  const handleClose = () => setModalData({ open: false, children: null });

  return (
    <>
      <ModalUpdater.Provider value={modalUpdater}>
        <SiteLinksContext.Provider value={siteLinks}>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={modalData.open}
            onClose={handleClose}
            className={classes.root}
          >
            {modalData.children}
          </Modal>
          <Nav {...{ siteTitle, siteSubtitle }} />
          <PageTransition location={location}>
            {children}
            <Footer {...{ siteTitle, siteFooter, siteLinks }} />
          </PageTransition>
        </SiteLinksContext.Provider>
      </ModalUpdater.Provider>
    </>
  );
};

export default Layout;
