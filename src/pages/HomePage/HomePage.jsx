import { Test } from '../../components/Test/Test.jsx'
import { cn } from '../../utils/cn.js'

export const HomePage = () => {
    return (
        <div>
            <Test className={cn('cursor-pointer text-red-500')} />
        </div>
    )
}
