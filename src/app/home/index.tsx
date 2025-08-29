import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import {
  ArrowCircleUp,
  ArrowCircleDown,
  Tag,
  ListPlus,
} from 'phosphor-react'
import { useEffect, useState } from 'react'
import { getDashboardSummary, type DashboardSummary } from '../../service/DashboardService'
import { DashboardCard } from '../../components/DashboardCard'

export default function Home() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  })

  const fetchSummary = async (currentFilters: typeof filters) => {
    setIsLoading(true)
    try {
      const data = await getDashboardSummary({
        startDate: currentFilters.startDate || null,
        endDate: currentFilters.endDate || null,
      })
      setSummary(data)
    } catch (error) {
      console.error('Erro ao buscar resumo do dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSummary(filters)
  }, [])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  const handleApplyFilters = () => {
    fetchSummary(filters)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2 }}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant="h4">Bem-vindo ao Ajudante Financeiro!</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Seu resumo financeiro em um só lugar.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          label="Data de Início"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Data de Fim"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={handleApplyFilters}>
          Aplicar Filtros
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            title="Total de Entradas"
            value={summary?.totalReceipts ?? 0}
            isLoading={isLoading}
            icon={<ArrowCircleUp size={32} />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            title="Total de Saídas"
            value={summary?.totalPayments ?? 0}
            isLoading={isLoading}
            icon={<ArrowCircleDown size={32} />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            title="Categorias de Entrada"
            value={summary?.totalReceiptCategories ?? 0}
            isLoading={isLoading}
            icon={<Tag size={32} />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            title="Categorias de Saída"
            value={summary?.totalPaymentCategories ?? 0}
            isLoading={isLoading}
            icon={<ListPlus size={32} />}
          />
        </Grid>
      </Grid>
    </Box>
  )
}