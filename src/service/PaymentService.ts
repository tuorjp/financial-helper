import api from './api';
import type { ManyPayments, SinglePayment } from './@types';

class PaymentService {
  static #instance: PaymentService;

  private constructor() {}

  public static getInstance(): PaymentService {
    if (!PaymentService.#instance) {
      PaymentService.#instance = new PaymentService();
    }
    return PaymentService.#instance;
  }

  async create(data: Omit<SinglePayment, 'id'>): Promise<SinglePayment | null> {
    try {
      const response = await api.post<SinglePayment>('/v1/payment', data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar saída:", error);
      return null;
    }
  }

  async list(): Promise<ManyPayments> {
    // NOTA: O backend não tem um GET all ainda.
    try {
      const initDate = '1970-01-01';
      const endDate = '2999-12-31';
      const response = await api.get<ManyPayments>(`/v1/payment-by-date?init-date=${initDate}&end-date=${endDate}`);
      return response.data;
    } catch (error)
    {
      console.error("Erro ao listar saídas:", error);
      return [];
    }
  }

  // --- Funções ainda não implementadas no backend ---

  async update(id: number, data: Partial<SinglePayment>): Promise<SinglePayment | null> {
    // Endpoint '/v1/payment/{id}' (PUT) não existe ainda no backend.
    try {
      const response = await api.put<SinglePayment>(`/v1/payment/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar saída ${id}:`, error);
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    // Endpoint '/v1/payment/{id}' (DELETE) não existe ainda no backend.
    try {
      await api.delete(`/v1/payment/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar saída ${id}:`, error);
      return false;
    }
  }
}

const usePaymentService = () => {
  return PaymentService.getInstance();
};

export { usePaymentService };