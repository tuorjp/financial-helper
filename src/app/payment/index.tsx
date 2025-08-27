import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { type PaymentFormProps, paymentFormSchema, paymentFormSchemaValidation } from './scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { usePaymentService } from '../../service/PaymentService'
import { useCategoryService } from '../../service/CategoryService'
import type { SingleCategory, SinglePayment } from '../../service/@types'
import { Eye, Pencil, Trash } from 'phosphor-react'

export default function Payment() {
  const paymentService = usePaymentService();
  const categoryService = useCategoryService();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<PaymentFormProps>({
    resolver: zodResolver(paymentFormSchemaValidation),
    defaultValues: paymentFormSchema
  })

  const [payments, setPayments] = useState<SinglePayment[]>([])
  const [categories, setCategories] = useState<SingleCategory[]>([])

  const fetchPayments = async () => {
    try {
      const data = await paymentService.list();
      setPayments(data);
    } catch (error) {
      toast.error("Falha ao buscar entradas." + error);
    }
  }

  const fetchPaymentCategories = async () => {
    try {
      const data = await categoryService.listByType(0); // 0 = Tipo ENTRADA
      setCategories(data);
    } catch (error) {
      toast.error("Falha ao buscar categorias de entrada." + error);
    }
  }

  useEffect(() => {
    fetchPayments();
    fetchPaymentCategories();
  }, [])

  const onSubmit = async (data: PaymentFormProps) => {
    try {
      await paymentService.create(data);
      toast.success("Entrada registrada com sucesso!");
      reset();
      fetchPayments();
    } catch (error) {
      toast.error("Erro ao registrar entrada." + error);
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta entrada?")) {
      const success = await paymentService.delete(id);
      if (success) {
        toast.success("Entrada excluída com sucesso!");
        fetchPayments();
      } else {
        toast.error("Erro ao excluir entrada.");
      }
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'paymentValue', headerName: 'Valor', flex: 1, type: 'number', valueFormatter: (value) => `R$ ${value}` },
    { field: 'paymentDate', headerName: 'Data', flex: 1, type: 'date', valueGetter: (value) => new Date(value) },
    { field: 'category', headerName: 'Categoria ID', flex: 1 },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => console.log('View', params.row.id)}><Eye /></IconButton>
          <IconButton onClick={() => console.log('Edit', params.row.id)}><Pencil /></IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}><Trash /></IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller name="paymentValue" control={control} render={({ field }) => <TextField {...field} label="Valor" type="number" error={!!errors.paymentValue} helperText={errors.paymentValue?.message} />} />
        <Controller name="paymentDate" control={control} render={({ field }) => <TextField {...field} label="Data da Entrada" type="date" error={!!errors.paymentDate} helperText={errors.paymentDate?.message} />} />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel>Categoria</InputLabel>
              <Select {...field} label="Categoria">
                <MenuItem value={0} disabled><em>Selecione uma categoria</em></MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </Select>
              {errors.category && <Typography color="red" fontSize={12}>{errors.category.message}</Typography>}
            </FormControl>
          )}
        />
        <Button type='submit' variant='contained' sx={{ alignSelf: 'flex-end' }}>Registrar Entrada</Button>
      </Box>

      <Box sx={{ boxShadow: 4, borderRadius: 1.5, p: 2, background: '#fff', mt: 4 }}>
        <DataGrid
          rows={payments}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, minHeight: 371 }}
        />
      </Box>
    </Box>
  )
}