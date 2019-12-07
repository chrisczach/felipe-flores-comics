import React from 'react';

import SEO from '../components/seo';
import PageContainer from '../components/page-container';

const NotFoundPage = () => (
  <PageContainer>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </PageContainer>
);

export default NotFoundPage;
