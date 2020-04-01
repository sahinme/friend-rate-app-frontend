import http from "./httpService";

class UserService {
    async getUserByName(username) {
        let result = await http.get(`api/user/get-user-by-name?username=${username}`);
        return result;
    }

    async createUser(payload) {
        var bodyFormData = new FormData();
        bodyFormData.set('username', payload.username);
        bodyFormData.set('email', payload.email);
        bodyFormData.set('password', payload.password);

        let result = await http.post('api/user/create-user', bodyFormData)
        return result
    }
}

export default new UserService();