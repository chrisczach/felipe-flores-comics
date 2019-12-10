import React from 'react';
import { graphql } from 'gatsby';

import { makeStyles, Typography } from '@material-ui/core';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import PageContainer from '../components/page-container';
import BlockContent from '../components/block-content';
import ProjectGrid from '../components/projects/project-grid';

const useStyles = makeStyles(theme => ({}));

const Category = props => {
  const { data, errors } = props;
  const classes = useStyles(props);
  if (errors) {
    return (
      <>
        <GraphQLErrorList errors={errors} />
      </>
    );
  }

  const { site } = data || {};
  const { page } = data || {};
  const projects = (data || {}).projects.nodes;
  const currentBreadcrumb = {
    slug: `/portfolio/${page.slug.current}/`,
    title: page.title,
  };

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <PageContainer
      pageTitle="Projects"
      hideTitleOnPortrait
      heroImage={page.heroImage}
      breadcrumbs={[
        { slug: '/portfolio/', title: 'Portfolio' },
        currentBreadcrumb,
      ]}
    >
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <h1 hidden>Welcome to {site.title}</h1>
      <BlockContent blocks={page.body} />
      <ProjectGrid
        {...{ projects }}
        forwardedBreadcrumb={currentBreadcrumb}
        enablePreview
      />
    </PageContainer>
  );
};

export const query = graphql`
  query CategoryTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    page: sanityCategory(id: { eq: $id }) {
      title
      slug {
        current
      }
      excerpt: _rawExcerpt
      body: _rawBody
      heroImage: mainImage {
        caption
        alt
        asset {
          localFile(width: 2400) {
            childImageSharp {
              fluid(
                maxWidth: 2400
                traceSVG: { color: "#8b151b77", background: "#ffd83111" }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
    #  (filter: {id: { eq: $id }})
    projects: allSanityProject {
      nodes {
        title
        slug {
          current
        }
        excerpt: _rawExcerpt
        categories {
          title
        }
        mainImage {
          caption
          alt
          asset {
            metadata {
              dimensions {
                aspectRatio
              }
            }
            localFile(width: 2400) {
              childImageSharp {
                fluid(
                  maxWidth: 2400
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
  }
`;

export default Category;
