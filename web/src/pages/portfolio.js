import React from 'react'
import {graphql, Link} from 'gatsby'

import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query PortfolioPageQuery {
    projects: allSanitySampleProject(
      limit: 12
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
    ) {
      edges {
        node {
          id
          mainImage {
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

const PortfolioPage = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const projectNodes =
    data && data.projects && []
  return (
    <Layout>
      <SEO title='Portfolio' />

      <div>Portfolio Page Starting</div>
<Link to='/'>Home</Link>
    </Layout>
  )
}

export default PortfolioPage
