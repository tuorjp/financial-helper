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

    async newUser(registerFormData: AuthUserProps): Promise<number> {
        try {
            const response = await api.post('user', registerFormData)
            const status = response.status
            return status
        } catch (error) {
            console.error(error)
            return 0;
        }
    }
}

const useUserService = () => {
    return UserService.getInstance()
}

export { useUserService }