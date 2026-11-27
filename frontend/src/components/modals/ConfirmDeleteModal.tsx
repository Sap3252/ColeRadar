import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

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
  // Mientras se elimina no se deja cerrar (Escape o clic afuera) para no perder el resultado.
  const handleOpenChange = (open: boolean) => {
    if (!open && !isDeleting) onCancel()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar «{itemName}»?</AlertDialogTitle>
          <AlertDialogDescription>
            Dar de baja lo oculta de la vista pública y se puede recuperar. Eliminar definitivamente
            lo borra para siempre.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          {/* Button común y no AlertDialogAction: Action cierra el modal antes de que termine la baja. */}
          <Button variant="secondary" disabled={isDeleting} onClick={() => onConfirm('soft')}>
            Dar de baja
          </Button>
          <Button variant="destructive" disabled={isDeleting} onClick={() => onConfirm('hard')}>
            Eliminar definitivamente
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
