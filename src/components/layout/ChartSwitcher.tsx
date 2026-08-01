import type { ComponentType } from 'react'

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
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-pressed={isActive}
            className={cn(
              'flex min-w-[160px] shrink-0 items-center gap-2 rounded-md border p-3 text-left text-sm transition-colors backdrop-blur-sm lg:min-w-0',
              isActive
                ? 'comic-panel font-medium'
                : 'border-border bg-background/90 hover:bg-muted',
            )}
            style={
              isActive
                ? { backgroundColor: accent[50], color: accent[800] }
                : undefined
            }
          >
            <Icon
              className="size-4 shrink-0"
              style={{ color: isActive ? accent[600] : neutral[500] }}
            />
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
