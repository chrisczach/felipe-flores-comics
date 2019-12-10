import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import { makeStyles, Typography, Box } from '@material-ui/core';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import PageContainer from '../components/page-container';
import BlockContent from '../components/block-content';
const useStyles = makeStyles(theme => ({}));

const ProjectTemplate = ({ location = null, ...props }) => {
  const { data, errors } = props;
  const classes = useStyles(props);
  if (errors) {
    return (
      <>
        <GraphQLErrorList errors={errors} />
      </>
    );
  }

  const site = (data || {}).site;
  const project = (data || {}).project;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  const forwardedBreadcrumbs =
    location && location.state && location.state.forwardedBreadcrumb
      ? [location.state.forwardedBreadcrumb]
      : [];

  return (
    <PageContainer
      pageTitle={project.title}
      breadcrumbs={[
        { slug: '/portfolio/', title: 'Portfolio' },
        ...forwardedBreadcrumbs,
        { slug: `'/projects/${project.slug.current}/'`, title: project.title },
      ]}
      // heroImage={ project.heroImage }
    >
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <h1 hidden>Welcome to {site.title}</h1>
      <Box style={{ width: '50%' }}>
        <Img fluid={project.heroImage.asset.localFile.childImageSharp.fluid} />
        <BlockContent blocks={project.body} />
      </Box>
    </PageContainer>
  );
};

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    project: sanityProject(id: { eq: $id }) {
      title
      slug {
        current
      }
      body: _rawBody
      heroImage: mainImage {
        caption
        alt
        asset {
          id
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
      categories {
        id
      }
      relatedProjects {
        title
      }
    }
  }
`;

export default ProjectTemplate;
