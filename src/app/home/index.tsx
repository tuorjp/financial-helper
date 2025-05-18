import { Box, Grid, Typography } from '@mui/material'
import { CustomCard } from '../../components/CustomCard'

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box mb={5} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant='h4'>
          Bem-vindo ao Ajudante financeiro!!
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid size={3}>
          <CustomCard
            title='Entradas/Saídas'
            text='Mantenha tudo registrado!! Registre as entradas e as saídas, separando por categorias e rastreando as datas de seus gastos 📝💲'
            route='/'
          />
        </Grid>
        <Grid size={3}>
          <CustomCard
            title='Relatórios'
            text='Visualize suas movimentações financeiras em forma de tabela ou gráfico, filtrando por período e categoria 📈📉'
            route='/'
          />
        </Grid>
        <Grid size={3}>
          <CustomCard
            title='Categorias'
            text='Registre cada tipo de gasto e ganho!! Cadastre as categorias de gastos e ganhos 🔍💰'
            route='/category'
          />
        </Grid>
        <Grid size={3}>
          <CustomCard
            title='Conta'
            text='Edite e atualize seus dados ou exclua sua conta 🧑👩. Caso vá excluir sua conta, obrigado por escolher o Ajudante Financeiro!!'
            route='/'
          />
        </Grid>
      </Grid>
    </Box>
  )
}
