import { $fetch } from 'ofetch'

export const api: typeof $fetch = $fetch.create({
  baseURL: import.meta.env.VITE_API_BASE,
})

export const keys = {
  TABLE_DATA: 'TABLE_DATA',
} as const
