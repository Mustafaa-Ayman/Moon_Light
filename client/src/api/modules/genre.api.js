import publicClient from "../client/public.client.js";

const genreEndpoints = {
    list:({mediaType})=> `${mediaType}/genres`
}

const genreApi = {
    getList : async ({mediaType}) => {
        try {
            const response = await publicClient.get(genreEndpoints.list({mediaType}));
            return {response}
        } catch (error) {
            return {error}
        }
    }

}

export default genreApi