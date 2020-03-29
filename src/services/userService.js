import http from "./httpService";

class UserService {
    async getUserByName(username) {
        let result = await http.get(`api/user/get-user-by-name?username=${username}`);
        return result;
    }
}

export default new UserService();