import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { type AuthFormProps, authFormSchema, authFormSchemaValidation } from './scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneRight } from 'phosphor-react'
import { useNavigate } from 'react-router'
import { useAuthenticationService } from '../../service/AuthenticationService'
import { useUserStore } from '../../context/userStore'
import { useState } from 'react'

export default function Login() {
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const authService = useAuthenticationService()
  const { setUser } = useUserStore()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormProps>({
    resolver: zodResolver(authFormSchemaValidation),
    defaultValues: authFormSchema
  })

  function onSubmit(userData: AuthFormProps) {
    try {
      console.log(userData)
      setloading(true)

      authService.login(userData, setUser)
      setloading(false)
      navigate('/')
    } catch (error) {
      console.error(error)
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
        <Typography variant='body1'>Login</Typography>
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
              <Button color='secondary' variant='contained' type='submit' >
                {loading == true ? 'Carregando...' : 'Entrar'}
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
            navigate('/register')
          }}
        >
          <Typography color='secondary'>
            Novo por aqui? Registre-se
          </Typography>
          <PaperPlaneRight color='#9C27B0' size={22} />
        </Box>
      </Paper>
    </Box>
  )
}
