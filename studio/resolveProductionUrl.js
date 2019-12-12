export default function resolveProductionUrl( {_type, slug: {current: slug}} ) {
  // WIP need to resolve path here
  // return JSON.stringify({_type, slug})
  const url = 'https://felipe-flores-comics-2846337642.gtsb.io'
  if(_type === 'page') return `${url}/${slug === '/' ? '' : slug}`;
  return `${url}/portfolio/${slug}`;
}
