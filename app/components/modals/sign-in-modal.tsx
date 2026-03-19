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
import Text from "~/components/Text"

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

const inputClassName =
  "h-14 rounded-[30px] bg-white border-gray px-[18px] py-4 text-base leading-6 tracking-[-0.02em] placeholder:text-gray focus-visible:border-dark focus-visible:ring-0 md:text-base"

function SignInModal({
  errorMessage,
  isLoading = false,
  onOpenChange,
  onSubmit,
  onSwitchToSignUp,
  open = false,
}: SignInModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const formik = useFormik<SignInValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await onSubmit?.(values)
    },
  })
  const { handleBlur, handleChange, handleSubmit, resetForm, values } = formik

  const isFilled = values.email.trim() !== "" && values.password.trim() !== ""
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
            aria-label="Close sign in modal"
            className="absolute top-5 right-5 inline-flex size-6 items-center justify-center text-dark transition-opacity hover:opacity-70"
            type="button"
          >
            <FIcon className="size-6" iconName="close-x" />
          </button>
        </DialogClose>

        <form className="flex flex-col gap-8 md:gap-10" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8 md:gap-10">
            <DialogTitle>SIGN IN</DialogTitle>

            <div className="flex flex-col gap-3.5">
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
                  placeholder="Password*"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                />
                {values.password && (
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
                )}
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
              {isLoading ? "SIGNING IN..." : "SIGN IN"}
            </Button>

            <div className="flex items-center justify-center text-center text-sm leading-[18px] font-medium tracking-[-0.02em] md:gap-2">
              <span className="text-gray">Don&apos;t have an account?</span>
              <button
                className="text-dark transition-opacity hover:opacity-70"
                onClick={onSwitchToSignUp}
                type="button"
              >
                Create an account
              </button>
            </div>

            {errorMessage && (
              <Text as={"span"} className="text-center text-destructive">
                {errorMessage}
              </Text>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { SignInModal }
