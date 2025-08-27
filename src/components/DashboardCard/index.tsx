import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material'

interface DashboardCardProps {
  title: string
  value: number
  icon: React.ReactNode
  isLoading: boolean
}

export function DashboardCard({
  title,
  value,
  icon,
  isLoading,
}: DashboardCardProps) {
  return (
    <Card sx={{ minWidth: 200, flexGrow: 1 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ color: 'primary.main' }}>{icon}</Box>
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {isLoading ? <Skeleton width={60} /> : value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}