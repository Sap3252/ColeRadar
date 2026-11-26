import type { Coordinates } from './location.js'

// Formas normalizadas que devuelve nuestro proxy /api/transit.
// La respuesta cruda de la API municipal se adapta a estas en el backend.

export interface Line {
  id: string
  company: string
  /** Nombre visible, por ejemplo "101 NEGRO" o "K". */
  name: string
  color?: string
}

export interface Stop {
  id: string
  name: string
  location: Coordinates
  /** Nombres de las líneas que pasan por la parada. */
  lines: string[]
}

export interface NearbyStop extends Stop {
  distanceMeters: number
}

/** outbound = ida, inbound = vuelta. */
export const ROUTE_DIRECTIONS = ['outbound', 'inbound'] as const
export type RouteDirection = (typeof ROUTE_DIRECTIONS)[number]

export interface LineRouteLeg {
  direction: RouteDirection
  path: Coordinates[]
  stops: Stop[]
}

export interface LineRoute {
  line: Line
  legs: LineRouteLeg[]
}

/** realtime = tiempo real, scheduled = programado. */
export const ARRIVAL_SOURCES = ['realtime', 'scheduled'] as const
export type ArrivalSource = (typeof ARRIVAL_SOURCES)[number]

export interface Arrival {
  line: string
  destination?: string
  minutes: number
  /** Hora estimada de llegada en ISO 8601. */
  arrivalTime: string
  source: ArrivalSource
}
