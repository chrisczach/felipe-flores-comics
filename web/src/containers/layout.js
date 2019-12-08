import { graphql, StaticQuery } from 'gatsby';
import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Layout from '../components/layout';
import theme from '../styles/theme';

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      subtitle
      footer: _rawFooterText
    }
  }
`;

function LayoutContainer(props) {
  const [showNav, setShowNav] = useState(false);
  function handleShowNav() {
    setShowNav(true);
  }
  function handleHideNav() {
    setShowNav(false);
  }
  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data',
          );
        }
        return (
          <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <Layout
                {...props}
                showNav={showNav}
                siteTitle={data.site.title}
                siteSubtitle={data.site.subtitle}
                siteFooter={data.site.footer}
                onHideNav={handleHideNav}
                onShowNav={handleShowNav}
              />
            </ThemeProvider>
          </>
        );
      }}
    />
  );
}

export default LayoutContainer;
