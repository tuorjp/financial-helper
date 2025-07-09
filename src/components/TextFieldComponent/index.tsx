import { Box, TextField, type TextFieldProps } from "@mui/material"
import { Controller, type Control, type FieldErrors, type FieldValues, type Path } from "react-hook-form"

type TextFieldComponentProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  errors: FieldErrors;
} & Omit<TextFieldProps, 'name' | 'label' | 'error' | 'helperText'>

export function TextFieldComponent<T extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: TextFieldComponentProps<T>) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            id={name}
            label={label}
            error={!!error}
            helperText={error ? error.message : ''}
            {...rest}
          />
        )}
      />
    </Box>
  )
}
