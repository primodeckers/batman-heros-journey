import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function BentoGrid({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(160px,1fr)]',
        className,
      )}
      {...props}
    />
  )
}
