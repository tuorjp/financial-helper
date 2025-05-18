import api from '.'
import type { AuthUserProps } from './@types'

class UserService {
    static #instance: UserService
    
    private constructor () {}

    public static getInstance() {
        if(!UserService.#instance) {
            this.#instance = new UserService()
        }
        return this.#instance
    }

    async newUser(registerFormData: AuthUserProps) {
        try {
            await api.post('user', registerFormData)
        } catch (error) {
            console.error(error)
        }
    }
}

const useUserService = () => {
    return UserService.getInstance()
}

export { useUserService }