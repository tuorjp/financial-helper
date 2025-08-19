import { Box, Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { Rewind } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { registerFormSchema, registerFormSchemaValidation, type RegisterFormProps } from './scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserService } from '../../service/UserService'
import { useState } from 'react'
import { TextFieldComponent } from '../../components/TextFieldComponent/index';
import { PasswordComponent } from '../../components/PasswordComponent'
import { useAuthenticationService } from '../../service/AuthenticationService'
import { useUserStore } from '../../context/userStore'
import { MainPanel } from '../../components/MainPanel'

export default function Register() {
  const navigate = useNavigate()
  const userService = useUserService()
  const authService = useAuthenticationService()
  const { setUser } = useUserStore()
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
      const status = await userService.newUser(registerFormData)

      if (status == 201) {
        try {
          setLoading(true)
          await authService.login(registerFormData, setUser)
          setLoading(false)
          navigate('/')
        } catch (error) {
          console.error(error)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainPanel>
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
            control={control}
            errors={errors}
            size='small'
            variant='outlined'
          />
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
              {loading ? "..." : "Enviar"}
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
            navigate('/')
          }}
        >
          <Typography color='secondary'>
            Voltar
          </Typography>
          <Rewind color='#9C27B0' size={22} />
        </Box>
      </Paper>
    </MainPanel>
  )
}
