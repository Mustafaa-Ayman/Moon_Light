import publicClient from "../client/public.client.js"

const personEndpoints = {
    detatil : ({personId}) => `person/${personId}`,
    medias : ({personId}) => `person/${personId}/medias`,


}

const personApi = {
    detatil : async ({personId}) => {
        try {
            const response = await publicClient.get(personEndpoints.detatil({
                personId
            }));
            return {response}
        } catch (error) {
            return {error}
        }
},
    medias : async ({personId}) => {
        try {
            const response = await publicClient.get(personEndpoints.medias({
                personId
            }));
            return {response}
        } catch (error) {
            return {error}
        }
},

}

export default personApi