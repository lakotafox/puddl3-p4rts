// Offline stub: upstream polls the GitHub API for a star count. There is no
// meaningful count for a local mirror, and the request fails with no network, so
// the label is a static wordmark instead. Same signature as upstream.
export const useStars = () => 'lakotafox';
