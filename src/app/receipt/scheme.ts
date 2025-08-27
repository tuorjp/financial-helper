import * as z from 'zod'

export interface ReceiptFormProps {
  receiptValue: number;
  receiptDate: string;
  category: number;
}

export const receiptFormSchema: ReceiptFormProps = {
  receiptValue: 0,
  receiptDate: '',
  category: 0,
}

export const receiptFormSchemaValidation = z.object({
  receiptValue: z.coerce.number().positive('O valor deve ser positivo.'),
  receiptDate: z.string().nonempty('A data é obrigatória.'),
  category: z.coerce.number().min(1, 'Selecione uma categoria.'),
})