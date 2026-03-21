import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import FIcon from "~/components/FIcon"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import type { SignUpDto } from "~/api/generated/model"

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(2, "Password must be at least 2 characters"),
})

type SignUpModalProps = {
  isLoading?: boolean
  isError?: boolean
  onResetError?: () => void
  onOpenChange?: (open: boolean) => void
  onSubmit?: (values: SignUpDto) => void | Promise<void>
  onSwitchToSignIn?: () => void
  open?: boolean
}

const inputClassName =
  "h-14 rounded-[30px] border-gray px-[18px] py-4 text-base leading-6 tracking-[-0.02em] placeholder:text-gray focus-visible:border-dark focus-visible:ring-0 md:text-base"

function SignUpModal({
  isLoading = false,
  isError = false,
  onResetError,
  onOpenChange,
  onSubmit,
  onSwitchToSignIn,
  open = false,
}: SignUpModalProps) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SignUpDto>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset()
      onResetError?.()
      setShowPassword(false)
    }
    onOpenChange?.(nextOpen)
  }

  const onFormSubmit = (data: SignUpDto) => {
    onSubmit?.(data)
  }

  const isButtonDisabled = isLoading || !isValid || isError

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent>
        <DialogClose className="absolute top-5 right-5">
          <button
            aria-label="Close sign up modal"
            className="inline-flex size-6 cursor-pointer items-center justify-center text-dark transition-opacity hover:opacity-70"
            type="button"
          >
            <FIcon className="size-6" iconName="close-x" />
          </button>
        </DialogClose>

        <form
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(onFormSubmit)}
          onChange={() => {
            if (isError) {
              onResetError?.()
            }
          }}
        >
          <div className="flex flex-col gap-10">
            <DialogTitle>SIGN UP</DialogTitle>

            <div className="flex flex-col gap-[14px]">
              <div className="flex flex-col gap-1">
                <Input
                  {...register("name")}
                  aria-label="Name"
                  className={inputClassName}
                  placeholder="Name*"
                  type="text"
                />
                {errors.name && (
                  <span className="px-4 text-xs text-destructive">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Input
                  {...register("email")}
                  aria-label="Email"
                  className={inputClassName}
                  placeholder="Email*"
                  type="text"
                />
                {errors.email && (
                  <span className="px-4 text-xs text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="relative">
                  <Input
                    {...register("password")}
                    aria-label="Password"
                    className={`${inputClassName} peer pr-12`}
                    placeholder="Password*"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute top-1/2 right-4 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center text-dark transition-opacity peer-placeholder-shown:hidden hover:opacity-70"
                    onClick={() => setShowPassword((prev) => !prev)}
                    type="button"
                  >
                    <FIcon
                      className="size-5"
                      iconName={showPassword ? "eye" : "eye-off"}
                    />
                  </button>
                </div>
                {errors.password && (
                  <span className="px-4 text-xs text-destructive">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Button
              className={`h-14 rounded-[30px] text-base leading-6 font-bold tracking-[-0.02em] text-white ${
                isValid ? "bg-dark hover:bg-light-dark" : "bg-gray"
              }`}
              disabled={isButtonDisabled}
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { SignUpModal }
