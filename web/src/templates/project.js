import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import { makeStyles, Typography, Box } from '@material-ui/core';

import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import PageContainer from '../components/page-container';
import BlockContent from '../components/block-content';
import ContainedDiv from '../components/contained-div';
import { getImageInfo } from '../lib/get-image-info';

import { ModalUpdater } from '../components/layout';
import FigureModal from '../components/figure/figure-modal';

const useStyles = makeStyles(theme => ({
  image: {
    cursor: 'pointer',
  },
}));

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

  const { site } = data || {};
  const { project } = data || {};

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  const forwardedBreadcrumbs =
    location && location.state && location.state.forwardedBreadcrumb
      ? [location.state.forwardedBreadcrumb]
      : [project.categories[0].title];

  const { fluid, aspectRatio } = getImageInfo({
    _ref: project.heroImage.asset._id,
  });

  const modalUpdater = useContext(ModalUpdater);

  const openHandler = () =>
    // @ts-ignore
    modalUpdater({
      children: (
        <FigureModal
          {...{
            fluid,
            aspectRatio,
            closeHandler: () => modalUpdater({ open: false, children: null }),
          }}
        />
      ),
    });

  return (
    <PageContainer
      pageTitle={project.title}
      breadcrumbs={[
        { slug: '/portfolio/', title: 'Portfolio' },
        ...forwardedBreadcrumbs,
        { slug: `'/projects/${project.slug.current}/'`, title: project.title },
      ]}
    >
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <h1 hidden>Welcome to {site.title}</h1>

      <ContainedDiv aspectRatio={aspectRatio}>
        <Box onClick={openHandler} className={classes.image}>
          <Img fluid={fluid} />
        </Box>
      </ContainedDiv>
      <BlockContent blocks={project.body} />
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
          _id
        }
      }
      categories {
        id
        title
      }
      relatedProjects {
        title
      }
    }
  }
`;

export default ProjectTemplate;
