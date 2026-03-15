import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog"
import { CloseIcon } from "~/components/ui/modal-icons"

type LogOutModalProps = {
  isLoading?: boolean
  onConfirm?: () => void | Promise<void>
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

function LogOutModal({
  isLoading = false,
  onConfirm,
  onOpenChange,
  open = false,
}: LogOutModalProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="gap-8">
        <DialogClose>
          <button
            aria-label="Close log out modal"
            className="absolute top-5 right-5 inline-flex size-6 items-center justify-center text-dark transition-opacity hover:opacity-70"
            type="button"
          >
            <CloseIcon className="size-6" />
          </button>
        </DialogClose>

        <div className="flex flex-col gap-5 pt-[60px]">
          <DialogTitle className="text-center">
            ARE YOU LOGGING OUT?
          </DialogTitle>
          <DialogDescription className="text-base leading-6 text-[#1A1A1A]">
            You can always log back in at my time.
          </DialogDescription>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            className="h-14 rounded-[30px] bg-dark text-base leading-6 font-bold tracking-[-0.02em] text-white hover:bg-light-dark disabled:bg-dark"
            disabled={isLoading}
            onClick={() => void onConfirm?.()}
            type="button"
          >
            {isLoading ? "LOGGING OUT..." : "LOG OUT"}
          </Button>

          <DialogClose>
            <Button
              className="h-14 rounded-[30px] border-[#1A1A1A] bg-white text-base leading-6 font-bold tracking-[-0.02em] text-dark hover:bg-muted"
              type="button"
              variant="outlineBlack"
            >
              CANCEL
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { LogOutModal }
