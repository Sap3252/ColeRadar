import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env } from '@/config/env'

// Cada dominio suma sus endpoints con api.injectEndpoints en su propio archivo.
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${env.apiUrl}/api`,
    credentials: 'include',
  }),
  tagTypes: ['Notice', 'Place'],
  endpoints: () => ({}),
})
