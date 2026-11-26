export function Footer() {
  return (
    <footer className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
      <p>Datos de transporte: Municipalidad de Rosario</p>
      <p>
        Mapa ©{' '}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          OpenStreetMap
        </a>
      </p>
    </footer>
  )
}
