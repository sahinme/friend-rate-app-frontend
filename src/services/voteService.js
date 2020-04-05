import http from "./httpService";

class VoteService {
    async createVote(payload) {
        let result = await http.post('api/vote/create-vote', payload);
        return result;
    }

    async getUserVotes(username) {
        let result = await http.get(`api/vote/get-user-votes?username=${username}`);
        return result;
    }
}

export default new VoteService();