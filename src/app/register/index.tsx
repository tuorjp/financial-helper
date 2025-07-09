import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { Rewind } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { registerFormSchema, registerFormSchemaValidation, type RegisterFormProps } from './scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserService } from '../../service/UserService'
import { useState } from 'react'
import { TextFieldComponent } from '../../components/TextFieldComponent/index';

export default function Register() {
  const navigate = useNavigate()
  const userService = useUserService()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormProps>({
    resolver: zodResolver(registerFormSchemaValidation),
    defaultValues: registerFormSchema
  })

  async function onSubmit(registerFormData: RegisterFormProps) {
    setLoading(true)
    try {
      console.log(registerFormData)
      userService.newUser(registerFormData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 4,
          borderRadius: 2,
          alignItems: 'center',
        }}
      >
        <Typography variant='h4'>Ajudante financeiro</Typography>
        <Typography variant='body1'>Novo usuário(a)</Typography>
        <Box
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            minWidth: 300
          }}
        >
          <TextFieldComponent 
            name='name'
            label='Nome'
            size='small'
            variant='outlined'
            errors={errors}
            control={control}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField
                  id='email'
                  label='Email'
                  size='small'
                  variant='outlined'
                  {...field}
                  value={field.value}
                />
              )}
            />
            {errors.email && <Typography color='red' fontSize={12}>{errors.email?.message}</Typography>}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <TextField
                  id='password'
                  label='Senha'
                  size='small'
                  variant='outlined'
                  {...field}
                  value={field.value}
                />
              )}
            />
            {errors.password && <Typography color='red' fontSize={12}>{errors.password?.message}</Typography>}
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
              <Button color='secondary' variant='contained' type='submit' disabled={loading}>
                {loading ? "..." : "Enviar"}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            cursor: 'pointer'
          }}
          onClick={() => {
            navigate('/')
          }}
        >
          <Typography color='secondary'>
            Voltar
          </Typography>
          <Rewind color='#9C27B0' size={22} />
        </Box>
      </Paper>
    </Box>
  )
}
