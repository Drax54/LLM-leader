import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schemaType?: string;
  path?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Holistic AI Leaderboard - AI Model Benchmarks and Ratings',
  description = 'Comprehensive assessment and benchmarking of AI language models for safety, performance, and business use cases. Compare top AI models with detailed analysis.',
  canonicalUrl = 'https://holisticai.com',
  ogImage = '/og-image.png',
  ogType = 'website',
  schemaType = 'WebPage',
  path
}) => {
  // Use provided path first, window.location.pathname second, or fallback to '/'
  const pathname = path || (typeof window !== 'undefined' ? window.location.pathname : '/');
  
  // Make sure pathname starts with a slash and remove trailing slash if present (except for root path)
  const normalizedPath = pathname === '/' ? '/' : pathname.startsWith('/') 
    ? pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    : `/${pathname}`;
  
  const url = `${canonicalUrl}${normalizedPath}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': schemaType,
          name: title,
          description: description,
          url: url,
          publisher: {
            '@type': 'Organization',
            name: 'Holistic AI',
            logo: {
              '@type': 'ImageObject',
              url: `${canonicalUrl}/holisticai.png`
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 