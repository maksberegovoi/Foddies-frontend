import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

// EXAMPLE:
// <button
//     className={cn(
//         'rounded-lg px-4 py-2 font-medium transition-colors',
//
//         variant === 'primary' &&
//         'bg-blue-600 text-white hover:bg-blue-700',
//         variant === 'outline' &&
//         'border border-slate-300 bg-transparent text-slate-700',
//
//         isActive && 'ring-2 ring-blue-400 ring-offset-2',
//
//         className
//     )}
// >
//     BUTTON
// </button>
