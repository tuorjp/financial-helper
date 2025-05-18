import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { type CategoryFormProps, categoryFormSchema, categoryFormSchemaValidation } from './scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { DataGrid } from '@mui/x-data-grid'

export default function Category() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CategoryFormProps>({
    resolver: zodResolver(categoryFormSchemaValidation),
    defaultValues: categoryFormSchema
  })

  const onSubmit = (data: CategoryFormProps) => console.log(data)

  return (
    <Box>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component={'form'}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextField
                id='name'
                label='Nome'
                variant='outlined'
                {...field}
                value={field.value || ''}
              />
            )}
          />
          {errors.name && <Typography color='red' fontSize={12}>Nome é obrigatório.</Typography>}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id='label-type'>Tipo de categoria</InputLabel>
                <Select
                  labelId='label-type'
                  id='type'
                  value={field.value}
                  label='Tipo'
                  onChange={field.onChange}
                >
                  <MenuItem value={0}>Entrada</MenuItem>
                  <MenuItem value={1}>Saída</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {errors.type && <Typography color='red' fontSize={12}>Tipo é obrigatório.</Typography>}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button type='submit' variant='contained'>Enviar</Button>
        </Box>
      </Box>
      <Box
        sx={{
          boxShadow: 4,
          borderRadius: 1.5,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          background: '#fff',
          mt: 4
        }}
      >
        <DataGrid
          columns={[
            {
              field: 'id',
              headerName: 'ID',
              type: 'number',
              flex: 1,
            },
            {
              field: 'name',
              headerName: 'Nome',
              type: 'string',
              flex: 1,
            },
            {
              field: 'type',
              headerName: 'Tipo',
              type: 'string',
              flex: 1,
            },
          ]}
          rows={[]}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, minHeight: 300 }}
        />
      </Box>
    </Box>
  )
}