import api from './api';
import type { ManyReceipts, SingleReceipt } from './@types';

class ReceiptService {
  static #instance: ReceiptService;

  private constructor() {}

  public static getInstance(): ReceiptService {
    if (!ReceiptService.#instance) {
      ReceiptService.#instance = new ReceiptService();
    }
    return ReceiptService.#instance;
  }

  async create(data: Omit<SingleReceipt, 'id'>): Promise<SingleReceipt | null> {
    try {
      const response = await api.post<SingleReceipt>('/receipt', data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar entrada:", error);
      return null;
    }
  }

  async list(): Promise<ManyReceipts> {
    // O backend não tem um GET all, então usamos o de data com um range grande.
    try {
      const initDate = '1970-01-01';
      const endDate = '2999-12-31';
      const response = await api.get<ManyReceipts>(`/receipt-by-date?init-date=${initDate}&end-date=${endDate}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar entradas:", error);
      return [];
    }
  }

  // --- Funções ainda não implementadas no backend ---

  async update(id: number, data: Partial<SingleReceipt>): Promise<SingleReceipt | null> {
    // Endpoint '/receipt/{id}' (PUT) não existe ainda no backend.
    try {
      const response = await api.put<SingleReceipt>(`/receipt/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar entrada ${id}:`, error);
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    // NOTA: Endpoint '/receipt/{id}' (DELETE) não existe ainda no backend.
    try {
      await api.delete(`/receipt/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar entrada ${id}:`, error);
      return false;
    }
  }
}

const useReceiptService = () => {
  return ReceiptService.getInstance();
};

export { useReceiptService };