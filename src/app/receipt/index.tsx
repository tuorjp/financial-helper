import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, IconButton } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { type ReceiptFormProps, receiptFormSchema, receiptFormSchemaValidation } from './scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Eye, Pencil, Trash } from 'phosphor-react'
import { useReceiptService } from '../../service/ReceiptService'
import { useCategoryService } from '../../service/CategoryService'
import type { SingleCategory, SingleReceipt } from '../../service/@types'

export default function Receipt() {
  // MUDANÇA: Instanciando os serviços
  const receiptService = useReceiptService();
  const categoryService = useCategoryService();

  const [receipts, setReceipts] = useState<SingleReceipt[]>([])
  const [categories, setCategories] = useState<SingleCategory[]>([])

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<ReceiptFormProps>({
    resolver: zodResolver(receiptFormSchemaValidation),
    defaultValues: receiptFormSchema
  })

  const fetchReceipts = async () => {
    try {
      const data = await receiptService.list();
      setReceipts(data);
    } catch (error) {
      toast.error("Falha ao buscar entradas." + error);
    }
  }

  const fetchReceiptCategories = async () => {
    try {
      const data = await categoryService.listByType(0); // 0 = Tipo ENTRADA
      setCategories(data);
    } catch (error) {
      toast.error("Falha ao buscar categorias de entrada." + error);
    }
  }

  useEffect(() => {
    fetchReceipts();
    fetchReceiptCategories();
  }, [])

  const onSubmit = async (data: ReceiptFormProps) => {
    try {
      await receiptService.create(data);
      toast.success("Entrada registrada com sucesso!");
      reset();
      fetchReceipts();
    } catch (error) {
      toast.error("Erro ao registrar entrada." + error);
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta entrada?")) {
      const success = await receiptService.delete(id);
      if (success) {
        toast.success("Entrada excluída com sucesso!");
        fetchReceipts();
      } else {
        toast.error("Erro ao excluir entrada.");
      }
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'receiptValue', headerName: 'Valor', flex: 1, type: 'number', valueFormatter: (value) => `R$ ${value}` },
    { field: 'receiptDate', headerName: 'Data', flex: 1, type: 'date', valueGetter: (value) => new Date(value) },
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
        <Controller
          name="receiptValue"
          control={control}
          render={
            ({ field }) => (
              <TextField
                {...field}
                label="Valor"
                type="number"
                error={!!errors.receiptValue} helperText={errors.receiptValue?.message}
              />
            )
          }
        />
        <Controller
          name="receiptDate"
          control={control}
          render={
            ({ field }) => (
              <TextField
                {...field}
                label="Data da Entrada"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.receiptDate} helperText={errors.receiptDate?.message}
              />
            )
          }
        />
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
          rows={receipts}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, minHeight: 371 }}
        />
      </Box>
    </Box>
  )
}