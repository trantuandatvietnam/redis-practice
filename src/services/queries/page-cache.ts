import { client } from '$services/redis';

const cacheRoutes = ['/about', '/privacy', '/auth/signin', '/auth/signup'];

const pageCachePrevKey = 'pageCache#';

export const getCachedPage = (route: string) => {
	if (cacheRoutes.includes(route)) {
		return client.get(`${pageCachePrevKey}${route}`);
	}
	return null;
};

export const setCachedPage = (route: string, page: string) => {
	if (cacheRoutes.includes(route)) {
		client.set(`${pageCachePrevKey}${route}`, page, {
			EX: 2
		});
	}
};
