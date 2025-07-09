import { Box, IconButton, InputAdornment, TextField, type TextFieldProps } from "@mui/material"
import { Eye, EyeSlash } from "phosphor-react"
import { useState } from "react"
import { Controller, type Control, type FieldErrors, type FieldValues, type Path } from "react-hook-form"

type PasswordComponentProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  errors: FieldErrors<T>;
} & Omit<TextFieldProps, 'name' | 'label' | 'error' | 'helperText'>

export function PasswordComponent <T extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: PasswordComponentProps<T>) {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

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
            type={showPassword ? 'text' : 'password'}
            error={!!error}
            helperText={error ? error.message : ''}
            slotProps={{
              input: {
                endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Esconder Senha' : 'Mostrar Senha'}
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <Eye size={24} /> : <EyeSlash size={24} />}
                  </IconButton>
                </InputAdornment>
              }
            }}
            {...rest}
          />
        )}
      />
    </Box>
  )
}