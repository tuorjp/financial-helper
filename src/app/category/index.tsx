import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, IconButton } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { type CategoryFormProps, categoryFormSchema, categoryFormSchemaValidation } from './scheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Eye, Pencil, Trash } from 'phosphor-react'
import { toast } from 'react-toastify'
import { useCategoryService } from '../../service/CategoryService'
import type { SingleCategory } from '../../service/@types'

export default function Category() {
  const categoryService = useCategoryService();

  const [categories, setCategories] = useState<SingleCategory[]>([])
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<CategoryFormProps>({
    resolver: zodResolver(categoryFormSchemaValidation),
    defaultValues: categoryFormSchema
  })

  const fetchCategories = async () => {
    try {
      // MUDANÇA: Usando o método do serviço
      const data = await categoryService.list();
      setCategories(data);
    } catch (error) {
      toast.error("Falha ao buscar categorias." + error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  const onSubmit = async (data: CategoryFormProps) => {
    try {
      await categoryService.create(data);
      toast.success("Categoria criada com sucesso!");
      reset();
      fetchCategories();
    } catch (error) {
      toast.error("Erro ao criar categoria." + error);
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        const success = await categoryService.delete(id);
        if (success) {
          toast.success("Categoria excluída com sucesso!");
          fetchCategories(); // Atualiza a lista
        } else {
          toast.error("Erro ao excluir categoria. Verifique se ela não está em uso.");
        }
      } catch (error) {
        toast.error("Erro ao excluir categoria." + error);
      }
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nome', flex: 1 },
    {
      field: 'type',
      headerName: 'Tipo',
      flex: 1,
      renderCell: (params) => (params.value === 0 ? 'Entrada' : 'Saída'),
    },
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
       
      <Box sx={{ boxShadow: 4, borderRadius: 1.5, p: 2, background: '#fff', mt: 4 }}>
        <DataGrid
          columns={columns}
          rows={categories}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, minHeight: 371 }}
        />
      </Box>
    </Box>
  )
}