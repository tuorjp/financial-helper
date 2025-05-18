import * as z from 'zod'

export const PropertyType = {
  Entrada: 0,
  Saida: 1
} as const;

export type PropertyTypeValue = (typeof PropertyType)[keyof typeof PropertyType];

export interface CategoryFormProps {
  type: PropertyTypeValue;
  name: string;
}

export const categoryFormSchema: Required<CategoryFormProps> = {
  type: PropertyType.Entrada,
  name: '',
}

export const categoryFormSchemaValidation = z.object({
  type: z.nativeEnum(PropertyType).refine((val) => val !== undefined, {
    message: 'Tipo de categoria é obrigatório',
  }),
  name: z.string().trim().nonempty('Nome é um campo obrigatório')
})