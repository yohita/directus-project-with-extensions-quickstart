export default function useDirectusToken(directusApi) {
	return {
		addQueryToPath,
		getToken,
		addTokenToURL,
	};

	function addQueryToPath(path, query) {
		const queryParams = [];

		for (const [key, value] of Object.entries(query)) {
			queryParams.push(`${key}=${value}`);
		}

		return path.includes('?') ? `${path}&${queryParams.join('&')}` : `${path}?${queryParams.join('&')}`;
	}

	function getToken() {
        console.log(directusApi.defaults);
		return (
			directusApi.defaults?.headers?.['Authorization']?.split(' ')[1] ||
			directusApi.defaults?.headers?.common?.['Authorization']?.split(' ')[1] ||
			null
		);
	}

	function addTokenToURL(url) {
		const accessToken = getToken();
        console.log('Access token:', accessToken);
		if (!accessToken) return url;
		return addQueryToPath(url, {
			access_token: accessToken,
		});
	}
};