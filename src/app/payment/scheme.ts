import * as z from 'zod'

export interface PaymentFormProps {
  paymentValue: number;
  paymentDate: string;
  category: number;
}

export const paymentFormSchema: PaymentFormProps = {
  paymentValue: 0,
  paymentDate: '',
  category: 0,
}

export const paymentFormSchemaValidation = z.object({
  paymentValue: z.coerce.number().positive('O valor deve ser positivo.'),
  paymentDate: z.string().nonempty('A data é obrigatória.'),
  category: z.coerce.number().min(1, 'Selecione uma categoria.'),
})