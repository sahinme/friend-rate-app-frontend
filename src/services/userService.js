import http from "./httpService";
import { writeLocalStorage } from "helper";

class UserService {
    async getUserByName(username) {
        let result = await http.get(`api/user/get-user-by-name?username=${username}`);
        return result;
    }

    async createUser(payload) {
        if (!payload.gender) payload.gender = 'N';
        var bodyFormData = new FormData();
        bodyFormData.set('username', payload.username);
        bodyFormData.set('emailAddress', payload.email);
        bodyFormData.set('gender', payload.gender);
        bodyFormData.set('password', payload.password);
        bodyFormData.set('profileImage', payload.profileImage);

        let result = await http.post('api/user/create-user', bodyFormData)
        if (result.status === 200 && result.data.id) {
            const data = await this.signIn({ username: payload.username, password: payload.password })
            if (data.status === 200 && data.data.token) {
                return result;
            }
        } else {
            return result;
        }
    }

    async signIn(values) {
        let result = await http.post(`api/token/post/userToken`, values);
        if (result.status === 200 && result.data.token) {
            writeLocalStorage('token', result.data.token)
            const userData = await this.getUserByName(values.username)
            writeLocalStorage('user', userData.data.result)
        }
        return result;
    }
}

export default new UserService();