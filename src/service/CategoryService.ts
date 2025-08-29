import api from './api';
import type { ManyCategories, SingleCategory } from './@types';

class CategoryService {
  static #instance: CategoryService;

  private constructor() {}

  public static getInstance(): CategoryService {
    if (!CategoryService.#instance) {
      CategoryService.#instance = new CategoryService();
    }
    return CategoryService.#instance;
  }

  async create(data: Omit<SingleCategory, 'id'>): Promise<SingleCategory | null> {
    try {
      const response = await api.post<SingleCategory>('/category', data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      return null;
    }
  }

  async list(): Promise<ManyCategories> {
    try {
      const response = await api.get<ManyCategories>('/category');
      return response.data;
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
      return [];
    }
  }

  async listByType(type: number): Promise<ManyCategories> {
    try {
      const response = await api.get<ManyCategories>(`/category/${type}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao listar categorias por tipo ${type}:`, error);
      return [];
    }
  }

  async update(id: number, data: Partial<SingleCategory>): Promise<SingleCategory | null> {
    // NOTA: Endpoint '/category/{id}' (PUT) não existe ainda no backend.
    try {
      const response = await api.put<SingleCategory>(`/category/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar categoria ${id}:`, error);
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    // NOTA: Endpoint '/category/{id}' (DELETE) não existe ainda no backend.
    try {
      await api.delete(`/category/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar categoria ${id}:`, error);
      return false;
    }
  }
}

const useCategoryService = () => {
  return CategoryService.getInstance();
};

export { useCategoryService };