import { Box } from "@mui/material";
import { CustomCard } from "../CustomCard";

type MainPanelProps = {
  children: React.ReactNode
}

export function MainPanel({ children }: MainPanelProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
      <Box
        sx={{
          display: { md: 'none', lg: 'flex' },
          flexDirection: 'column',
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#9C27B0'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            padding: 20,
          }}
        >
          <Box width={'100%'}>
            <CustomCard
              title='Entradas/Saídas'
              text='Mantenha tudo registrado!! Registre as entradas e as saídas, separando por categorias e rastreando as datas de seus gastos 📝💲'
            />
          </Box>
          <Box width={'100%'}>
            <CustomCard
              title='Relatórios'
              text='Visualize suas movimentações financeiras em forma de tabela ou gráfico, filtrando por período e categoria 📈📉'
            />
          </Box>
          <Box width={'100%'}>
            <CustomCard
              title='Categorias'
              text='Registre cada tipo de gasto e ganho!! Cadastre as categorias de gastos e ganhos 🔍💰'
            />
          </Box>
        </Box>
      </Box>
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
        {children}
      </Box>
    </Box>
  )
}