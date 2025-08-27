import api from "./api"

export interface DashboardSummary {
  totalReceipts: number
  totalPayments: number
  totalReceiptCategories: number
  totalPaymentCategories: number
}

interface FetchSummaryParams {
  startDate?: string | null
  endDate?: string | null
}

export const getDashboardSummary = async ({
  startDate,
  endDate,
}: FetchSummaryParams): Promise<DashboardSummary> => {
  const params = new URLSearchParams()
  if (startDate) {
    params.append('start-date', startDate)
  }
  if (endDate) {
    params.append('end-date', endDate)
  }

  const response = await api.get('/dashboard/summary', { params })
  return response.data
}