import http from "./httpService";

class VoteService {
    async createVote(payload) {
        let result = await http.post('api/vote/create-vote');
        return result;
    }
}

export default new VoteService();