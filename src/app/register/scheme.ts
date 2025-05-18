import * as z from 'zod'

export type RegisterFormProps = {
  name: string;
  email: string;
  password: string;
}

export const registerFormSchema: RegisterFormProps = {
  name: '',
  email: '',
  password: '',
}

export const registerFormSchemaValidation = z.object({
  name: z.string().trim().nonempty('Insira um nome'),
  email: z.string().trim().email('Insira um email válido').nonempty('Insira um email'),
  password: z.string().nonempty('Insira uma senha').min(8, 'A senha precisa ter no mínimo 8 caracteres')
})
