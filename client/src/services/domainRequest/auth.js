import { post } from "../requestHelper"

export const login = async (body) => {
    debugger
    return await post('auth/login', body);
}