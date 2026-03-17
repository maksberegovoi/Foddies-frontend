import { useState } from "react"
import { useFormik } from "formik"

import FIcon from "~/components/FIcon"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"

type SignUpValues = {
  email: string
  name: string
  password: string
}

type SignUpModalProps = {
  errorMessage?: string | null
  isLoading?: boolean
  onOpenChange?: (open: boolean) => void
  onSubmit?: (values: SignUpValues) => void | Promise<void>
  onSwitchToSignIn?: () => void
  open?: boolean
}

const inputClassName =
  "h-14 rounded-[30px] border-gray px-[18px] py-4 text-base leading-6 tracking-[-0.02em] placeholder:text-gray focus-visible:border-dark focus-visible:ring-0 md:text-base"

function SignUpModal({
  errorMessage,
  isLoading = false,
  onOpenChange,
  onSubmit,
  onSwitchToSignIn,
  open = false,
}: SignUpModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const formik = useFormik<SignUpValues>({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    onSubmit: async (values) => {
      await onSubmit?.(values)
    },
  })
  const { handleBlur, handleChange, handleSubmit, resetForm, values } = formik

  const isFilled =
    values.name.trim() !== "" &&
    values.email.trim() !== "" &&
    values.password.trim() !== ""
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm()
      setShowPassword(false)
    }

    onOpenChange?.(nextOpen)
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent className="gap-10">
        <DialogClose>
          <button
            aria-label="Close sign up modal"
            className="absolute top-5 right-5 inline-flex size-6 items-center justify-center text-dark transition-opacity hover:opacity-70"
            type="button"
          >
            <FIcon className="size-6" iconName="close-x" />
          </button>
        </DialogClose>

        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            <DialogTitle>SIGN UP</DialogTitle>

            <div className="flex flex-col gap-[14px]">
              <Input
                aria-label="Name"
                className={inputClassName}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Name*"
                type="text"
                value={values.name}
              />

              <Input
                aria-label="Email"
                className={inputClassName}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Email*"
                type="email"
                value={values.email}
              />

              <div className="relative">
                <Input
                  aria-label="Password"
                  className={`${inputClassName} pr-12`}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
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
                    <FIcon
                      className="size-5"
                      iconName={showPassword ? "eye" : "eye-off"}
                    />
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
                  : "bg-gray hover:bg-gray"
              } disabled:bg-gray`}
              disabled={isLoading || !isFilled}
              type="submit"
            >
              {isLoading ? "CREATING..." : "CREATE"}
            </Button>

            <div className="flex items-center justify-center gap-2 text-center text-sm leading-[18px] font-medium tracking-[-0.02em]">
              <span className="text-gray">I already have an account?</span>
              <button
                className="text-dark transition-opacity hover:opacity-70"
                onClick={onSwitchToSignIn}
                type="button"
              >
                Sign in
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

export { SignUpModal }
