# @coleradar/shared

Contrato entre `frontend/` y `backend/`: tipos de dominio y esquemas Zod que validan lo mismo en el cliente y en el servidor (RNF-10).

## Uso

Es un workspace de npm. Desde la raíz del repo:

```bash
npm install   # instala todo y compila shared/ en shared/dist
```

En el frontend o el backend se agrega como dependencia `"@coleradar/shared": "*"` y se importa:

```ts
import { createNoticeSchema, type Notice } from '@coleradar/shared'
```

Para que los cambios en `shared/` se vean mientras se desarrolla: `npm run dev -w @coleradar/shared`.

## Contenido

| Archivo | Qué define |
|---|---|
| `notices.ts` | `Notice`, tipos de aviso, esquemas para crear y actualizar |
| `places.ts` | `Place`, categorías, esquemas para crear y actualizar |
| `transit.ts` | `Line`, `Stop`, `NearbyStop`, `LineRoute`, `Arrival` (formas normalizadas del proxy) |
| `location.ts` | `Coordinates` y validación de latitud y longitud dentro de Rosario |
| `pagination.ts` | Esquema de `?page=&limit=` y `PaginatedResponse<T>` |
| `users.ts` | Roles `user` y `admin` |
| `errors.ts` | Forma de las respuestas de error de la API |

## Acuerdos del contrato

- Las respuestas usan `id` (texto), no `_id`.
- Las fechas viajan como texto ISO 8601; los esquemas las convierten a `Date` al validar.
- Los esquemas de actualización son parciales y no aplican valores por defecto, así un `PATCH` no pisa campos que no se mandaron.
- `createdBy`, `active`, `createdAt`, `updatedAt` y `deletedAt` los completa el servidor; no forman parte de los esquemas de entrada.
- Los valores de los enums (`desvio`, `salud`…) quedan en español porque son datos que se muestran, igual que en el plan.
