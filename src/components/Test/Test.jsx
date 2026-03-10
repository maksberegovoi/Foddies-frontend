import { cn } from '../../utils/cn.js'
import { useState } from 'react'

export const Test = ({ className = '' }) => {
    const [isActive, setActive] = useState(false)
    const variant = 'primary'

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-x-10 bg-slate-900 p-8">
            <h1 className="mb-4 text-3xl font-bold text-slate-800">
                Hello world
            </h1>
            <button
                onClick={() => setActive(!isActive)}
                className={cn(
                    'rounded-lg px-4 py-2 font-medium transition-colors',

                    variant === 'primary' &&
                        'bg-blue-600 text-white hover:bg-blue-700',
                    variant === 'outline' &&
                        'border border-slate-300 bg-transparent text-slate-700',

                    isActive && 'ring-2 ring-blue-400 ring-offset-2',

                    className
                )}
            >
                BUTTON
            </button>
        </div>
    )
}
