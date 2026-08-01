import type { ComponentType } from 'react'
import { motion } from 'framer-motion'

import { accent, neutral } from '@/theme/palette'
import { cn } from '@/lib/utils'

export type ChartSwitcherItem<Id extends string> = {
  id: Id
  label: string
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>
}

type ChartSwitcherProps<Id extends string> = {
  items: ChartSwitcherItem<Id>[]
  selected: Id
  onSelect: (id: Id) => void
}

export function ChartSwitcher<Id extends string>({
  items,
  selected,
  onSelect,
}: ChartSwitcherProps<Id>) {
  return (
    <div className="flex flex-row gap-3 overflow-x-auto lg:w-64 lg:shrink-0 lg:flex-col lg:overflow-visible">
      {items.map(({ id, label, icon: Icon }) => {
        const isActive = id === selected
        return (
          <motion.button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-pressed={isActive}
            layout
            initial={false}
            whileHover={isActive ? { scale: 1.01 } : { x: 4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className={cn(
              'flex min-w-[160px] shrink-0 items-center gap-2 rounded-md border p-3 text-left text-sm backdrop-blur-sm lg:min-w-0',
              isActive
                ? 'comic-panel font-medium'
                : 'border-border bg-background/90 hover:bg-muted',
            )}
            style={
              isActive
                ? { backgroundColor: accent[50], color: accent[800] }
                : { color: neutral[800] }
            }
          >
            <motion.span
              initial={false}
              animate={isActive ? { scale: [1, 1.22, 1], x: [0, -3, 0] } : { scale: 1, x: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex shrink-0"
            >
              <Icon
                className="size-4"
                style={{ color: isActive ? accent[600] : neutral[500] }}
              />
            </motion.span>
            <motion.span
              initial={false}
              animate={isActive ? { x: [8, 0], opacity: [0.55, 1] } : { x: 0, opacity: 1 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {label}
            </motion.span>
          </motion.button>
        )
      })}
    </div>
  )
}
