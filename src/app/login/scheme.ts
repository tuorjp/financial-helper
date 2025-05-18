import * as z from 'zod'

export interface AuthFormProps {
    email: string;
    password: string;
}

export const authFormSchema: AuthFormProps = {
    email: '',
    password: ''
}

export const authFormSchemaValidation = z.object({
    email: z.string().trim().nonempty('Insira um email para entrar.').email('Por favor insira um email válido'),
    password: z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres').nonempty('Insira uma senha')
})
