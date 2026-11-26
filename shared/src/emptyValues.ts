/** Los formularios mandan "" y algunos clientes null: los dos significan "no vino". */
export const emptyToUndefined = (value: unknown) =>
  value === null || value === '' ? undefined : value
