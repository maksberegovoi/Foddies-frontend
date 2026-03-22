import FIcon from "~/components/FIcon"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog"
import { useMediaQuery } from "@uidotdev/usehooks"

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
  const isMobile = useMediaQuery("only screen and (max-width : 767px)")
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogClose
          aria-label="Close log out modal"
          className="absolute top-5 right-5 inline-flex size-6 items-center justify-center text-dark transition-opacity hover:opacity-70"
        >
          <FIcon className="size-6" iconName="close-x" />
        </DialogClose>
        <div className="flex flex-col gap-5 pt-[60px] text-center">
          <DialogTitle>
            {isMobile ? "LOG OUT" : "ARE YOU LOGGING OUT?"}
          </DialogTitle>
          <DialogDescription className="text-base leading-6 text-light-dark">
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
              className="h-14 w-full rounded-[30px] border-dark bg-white text-base leading-6 font-bold tracking-[-0.02em] text-dark hover:bg-muted"
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
