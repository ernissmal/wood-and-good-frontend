// Generate static params for static export
export async function generateStaticParams() {
  // For static export, we'll return common product slugs
  // In production, you would fetch actual product slugs from your CMS
  return [
    { slug: 'oak-dining-table' },
    { slug: 'oak-coffee-table' },
    { slug: 'oak-table-legs' },
    { slug: 'oak-tabletop' },
    { slug: 'rustic-dining-table' },
  ];
}