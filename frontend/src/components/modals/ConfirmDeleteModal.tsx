import { useEffect, useRef, type SyntheticEvent } from 'react'

/** soft = baja lógica (se oculta), hard = baja física (se borra). */
export type DeleteMode = 'soft' | 'hard'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  itemName: string
  isDeleting?: boolean
  onCancel: () => void
  onConfirm: (mode: DeleteMode) => void
}

export function ConfirmDeleteModal({
  isOpen,
  itemName,
  isDeleting = false,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // <dialog> nativo: trae foco atrapado, cierre con Escape y fondo bloqueado sin librerías.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault()
    if (!isDeleting) onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="confirm-delete-title"
      onCancel={handleCancel}
    >
      <h2 id="confirm-delete-title" className="modal__title">
        ¿Eliminar «{itemName}»?
      </h2>
      <ul className="modal__options">
        <li>
          <strong>Dar de baja</strong> lo oculta de la vista pública y se puede recuperar.
        </li>
        <li>
          <strong>Eliminar definitivamente</strong> lo borra para siempre.
        </li>
      </ul>
      <div className="modal__actions">
        <button type="button" className="button" onClick={onCancel} disabled={isDeleting}>
          Cancelar
        </button>
        <button
          type="button"
          className="button button--warning"
          onClick={() => onConfirm('soft')}
          disabled={isDeleting}
        >
          Dar de baja
        </button>
        <button
          type="button"
          className="button button--danger"
          onClick={() => onConfirm('hard')}
          disabled={isDeleting}
        >
          Eliminar definitivamente
        </button>
      </div>
    </dialog>
  )
}
