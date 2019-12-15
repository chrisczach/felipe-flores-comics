import { graphql, StaticQuery } from 'gatsby';
import React, { useState, createContext } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Layout from '../components/layout';
import theme from '../styles/theme';

const query = graphql`
  query SiteLayoutQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      subtitle
      footer: _rawFooterText(resolveReferences: { maxDepth: 5 })
      linksList {
        _key
        icon {
          asset {
            fluid(maxWidth: 480) {
              ...GatsbySanityImageFluid
            }
          }
        }
        linkTitle
        linkUrl
      }
    }
    assets: allSanityImageAsset {
      edges {
        node {
          _id
          metadata {
            dimensions {
              aspectRatio
            }
          }
          localFile(width: 480) {
            childImageSharp {
              fluid(
                maxWidth: 480
                traceSVG: { color: "#8b151b77", background: "#ffd83111" }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;

export const AssetsContext = createContext({});

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
      render={({ assets, ...data }) => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data',
          );
        }

        const {
          site: { linksList },
        } = data;
        const siteLinks = linksList.map(
          ({
            linkTitle,
            linkUrl,
            _key: key,
            icon: {
              asset: { fluid },
            },
          }) => ({ linkTitle, linkUrl, fluid, key }),
        );
        return (
          <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <AssetsContext.Provider value={assets}>
                <Layout
                  {...props}
                  showNav={showNav}
                  siteTitle={data.site.title}
                  siteSubtitle={data.site.subtitle}
                  siteFooter={data.site.footer}
                  onHideNav={handleHideNav}
                  onShowNav={handleShowNav}
                  siteLinks={siteLinks}
                />
              </AssetsContext.Provider>
            </ThemeProvider>
          </>
        );
      }}
    />
  );
}

export default LayoutContainer;
