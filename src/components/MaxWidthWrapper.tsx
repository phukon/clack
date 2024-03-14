import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div className={cn('md:mx-auto w-full min-w-[355px] max-w-screen-xl px-2.5 ml-3 md:px-20', className)}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
