export default function APIAccess() {
    return {
        async getSearchTweets(q) {
            if (!q) {
                throw new Error('q parameter is required to fetch tweets');
            }

            return await fetch(`/api/tweets/?q=${q}`)
                .then((response) => {
                    if (!response.ok) {
                        throw response;
                    }

                    return response.json();
                })
                .catch((error) => {
                    throw error;
                });
        },
    };
}
