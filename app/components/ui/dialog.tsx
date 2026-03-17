import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "~/lib/utils"

type DialogContextValue = {
  descriptionId: string
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

function useDialogContext(componentName: string) {
  const context = React.useContext(DialogContext)

  if (!context) {
    throw new Error(`${componentName} must be used within a <Dialog />`)
  }

  return context
}

type DialogProps = {
  children: React.ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

function Dialog({
  children,
  defaultOpen = false,
  onOpenChange,
  open: openProp,
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const titleId = React.useId()
  const descriptionId = React.useId()
  const open = openProp ?? uncontrolledOpen

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (openProp === undefined) {
        setUncontrolledOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [onOpenChange, openProp]
  )

  React.useEffect(() => {
    if (!open || typeof document === "undefined") return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [open])

  return (
    <DialogContext.Provider value={{ descriptionId, open, setOpen, titleId }}>
      {children}
    </DialogContext.Provider>
  )
}

type DialogTriggerProps = {
  children: React.ReactElement<{
    "aria-expanded"?: boolean
    "aria-haspopup"?: React.AriaAttributes["aria-haspopup"]
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
  }>
}

function DialogTrigger({ children }: DialogTriggerProps) {
  const { open, setOpen } = useDialogContext("DialogTrigger")

  return React.cloneElement(children, {
    "aria-expanded": open,
    "aria-haspopup": "dialog",
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      children.props.onClick?.(event)

      if (!event.defaultPrevented) {
        setOpen(true)
      }
    },
  })
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || typeof document === "undefined") {
    return null
  }

  return createPortal(children, document.body)
}

function DialogOverlay({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 animate-in bg-dark/45 backdrop-blur-[2px] duration-200 fade-in-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  children,
  className,
  onClick,
  ...props
}: React.ComponentProps<"div">) {
  const { descriptionId, open, setOpen, titleId } =
    useDialogContext("DialogContent")
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, setOpen])

  React.useEffect(() => {
    if (!open) return

    contentRef.current?.focus()
  }, [open])

  if (!open) {
    return null
  }

  return (
    <DialogPortal>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        <DialogOverlay onClick={() => setOpen(false)} />
        <div
          ref={contentRef}
          aria-describedby={descriptionId}
          aria-labelledby={titleId}
          aria-modal="true"
          className={cn(
            "relative z-10 flex w-full max-w-[560px] animate-in flex-col rounded-[30px] bg-white px-8 py-14 duration-200 fade-in-0 outline-none zoom-in-95 sm:px-20 sm:py-20",
            className
          )}
          data-slot="dialog-content"
          onClick={(event) => {
            event.stopPropagation()
            onClick?.(event)
          }}
          role="dialog"
          tabIndex={-1}
          {...props}
        >
          {children}
        </div>
      </div>
    </DialogPortal>
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  const { titleId } = useDialogContext("DialogTitle")

  return (
    <h2
      className={cn(
        "text-[32px] leading-10 font-extrabold tracking-[-0.02em] uppercase",
        className
      )}
      data-slot="dialog-title"
      id={titleId}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { descriptionId } = useDialogContext("DialogDescription")

  return (
    <p
      className={cn(
        "text-center text-sm leading-[18px] font-medium tracking-[-0.02em] text-gray",
        className
      )}
      data-slot="dialog-description"
      id={descriptionId}
      {...props}
    />
  )
}

type DialogCloseProps = {
  children: React.ReactElement<{
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
  }>
}

function DialogClose({ children }: DialogCloseProps) {
  const { setOpen } = useDialogContext("DialogClose")

  return React.cloneElement(children, {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      children.props.onClick?.(event)

      if (!event.defaultPrevented) {
        setOpen(false)
      }
    },
  })
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
