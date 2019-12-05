import React from 'react'
import {graphql, Link} from 'gatsby'

import SEO from '../components/seo'

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
      <>
        <GraphQLErrorList errors={errors} />
      </>
    )
  }
  const projectNodes =
    data && data.projects && []
  return (
    <>
      <SEO title='Portfolio' />

      <div>Portfolio Page Starting</div>
<Link to='/'>Home</Link>
    </>
  )
}

export default PortfolioPage
