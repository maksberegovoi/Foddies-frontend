import * as React from "react"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { CloseIcon, EyeIcon, EyeOffIcon } from "~/components/ui/modal-icons"

type SignInValues = {
  email: string
  password: string
}

type SignInModalProps = {
  errorMessage?: string | null
  isLoading?: boolean
  onOpenChange?: (open: boolean) => void
  onSubmit?: (values: SignInValues) => void | Promise<void>
  onSwitchToSignUp?: () => void
  open?: boolean
}

function SignInModal({
  errorMessage,
  isLoading = false,
  onOpenChange,
  onSubmit,
  onSwitchToSignUp,
  open = false,
}: SignInModalProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [values, setValues] = React.useState<SignInValues>({
    email: "",
    password: "",
  })
  const isFilled = values.email.trim() !== "" && values.password.trim() !== ""

  const handleChange =
    (field: keyof SignInValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit?.(values)
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="gap-10">
        <DialogClose>
          <button
            aria-label="Close sign in modal"
            className="absolute top-5 right-5 inline-flex size-6 items-center justify-center text-dark transition-opacity hover:opacity-70"
            type="button"
          >
            <CloseIcon className="size-6" />
          </button>
        </DialogClose>

        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            <DialogTitle>SIGN IN</DialogTitle>

            <div className="flex flex-col gap-[14px]">
              <Input
                aria-label="Email"
                className="h-14 rounded-[30px] border-[#BFBEBE] px-[18px] py-4 text-base leading-6 tracking-[-0.02em] placeholder:text-[#BFBEBE] focus-visible:border-[#050505] focus-visible:ring-0"
                onChange={handleChange("email")}
                placeholder="Email*"
                type="email"
                value={values.email}
              />

              <div className="relative">
                <Input
                  aria-label="Password"
                  className="h-14 rounded-[30px] border-[#BFBEBE] px-[18px] py-4 pr-12 text-base leading-6 tracking-[-0.02em] placeholder:text-[#BFBEBE] focus-visible:border-[#050505] focus-visible:ring-0"
                  onChange={handleChange("password")}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                />
                {values.password ? (
                  <button
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute top-1/2 right-4 inline-flex -translate-y-1/2 items-center justify-center text-dark transition-opacity hover:opacity-70"
                    onClick={() => setShowPassword((current) => !current)}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeIcon className="size-5" />
                    ) : (
                      <EyeOffIcon className="size-5" />
                    )}
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Button
              className={`h-14 rounded-[30px] text-base leading-6 font-bold tracking-[-0.02em] text-white ${
                isFilled
                  ? "bg-dark hover:bg-light-dark"
                  : "bg-[#BFBEBE] hover:bg-[#BFBEBE]"
              } disabled:bg-[#BFBEBE]`}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "SIGNING IN..." : "SIGN IN"}
            </Button>

            <div className="flex items-center justify-center gap-2 text-center text-sm leading-[18px] font-medium tracking-[-0.02em]">
              <span className="text-[#BFBEBE]">
                Don&apos;t have an account?
              </span>
              <button
                className="text-dark transition-opacity hover:opacity-70"
                onClick={onSwitchToSignUp}
                type="button"
              >
                Create an account
              </button>
            </div>

            {errorMessage ? (
              <p className="text-center text-sm text-destructive">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { SignInModal }
