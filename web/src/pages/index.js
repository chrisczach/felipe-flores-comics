import React from 'react'
import {graphql, Link} from 'gatsby'
import {
  Container,
  Paper,
  Collapse,
  Typography,
  TextField,
  Zoom,
  Fade,
  Grow,
  Slide,
  Breadcrumbs,
  Box,
  Button,
} from '@material-ui/core';


import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    projects: allSanitySampleProject(
      limit: 6
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <>
        <GraphQLErrorList errors={errors} />
      </>
    )
  }

  const site = (data || {}).site
  const projectNodes = (data || {}).projects
    ? ['to','an','array'] : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <h1 hidden>Welcome to {site.title}</h1>
      <Typography variant='h1'>Home Page Starting Heading 1</Typography>
      <Typography variant='h2'>Home Page Starting Heading 2</Typography>
      <Typography variant='h3'>Home Page Starting Heading 3</Typography>
      <Typography variant='body1'>Paragraph test here.</Typography>
      <Link to='about'>About</Link>
      <Link to='portfolio'>Portfolio</Link>
    </>
  )
}

export default IndexPage
