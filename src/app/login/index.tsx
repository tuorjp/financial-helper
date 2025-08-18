import { Box, Button, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { type AuthFormProps, authFormSchema, authFormSchemaValidation } from './scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneRight } from 'phosphor-react'
import { useNavigate } from 'react-router'
import { useAuthenticationService } from '../../service/AuthenticationService'
import { useUserStore } from '../../context/userStore'
import { useState } from 'react'
import { TextFieldComponent } from '../../components/TextFieldComponent'
import { PasswordComponent } from '../../components/PasswordComponent'

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

  async function onSubmit(userData: AuthFormProps) {
    try {
      console.log(userData)
      setloading(true)

      await authService.login(userData, setUser)
      setloading(false)
      navigate('/')
    } catch (error) {
      console.error(error)
    } finally {
      setloading(false)
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
          <TextFieldComponent 
            name='email'
            label='Email'
            control={control}
            errors={errors}
            size='small'
            variant='outlined'
          />
          <PasswordComponent 
            name='password'
            label='Senha'
            control={control}
            errors={errors}
            size='small'
            variant='outlined'
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
            <Button color='secondary' variant='contained' type='submit' disabled={loading}>
              {loading == true ? 'Carregando...' : 'Entrar'}
            </Button>
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
