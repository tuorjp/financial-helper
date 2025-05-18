import api from '.'
import type { ManyCategories, SingleCategory } from './@types'

class CategoryService {
  static #instance: CategoryService

  private constructor() { }

  public static getInstance() {
    if (!CategoryService.#instance) {
      CategoryService.#instance = new CategoryService()
    }

    return CategoryService.#instance
  }

  async create(data: SingleCategory): Promise<SingleCategory | null> {
    try {
      console.log('DATA', data)
      const response = await api.post<SingleCategory>('/category', data)
      console.log('RESPONSE', response)
      return response.data
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async list(): Promise<ManyCategories> {
    try {
      const response = await api.get<ManyCategories>('/category')
      console.log('RESPONSE', response)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  }
}

const useCategoryService = () => {
  return CategoryService.getInstance()
}

export { useCategoryService }