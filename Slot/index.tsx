import React, { ReactElement, cloneElement } from 'react'
import { getDefaultSlot, getSlot } from './utils'

export interface SlotProps {
  name?: string
  required?: boolean
  fallback?: ReactElement
}

export const Slot = ({
  name = 'default',
  children,
  required,
  fallback
}: React.PropsWithChildren<SlotProps>): ReactElement => {
  if (name === 'default') {
    return getDefaultSlot(children)
  }

  const content = getSlot(children, name)
  if (content !== undefined) {
    return cloneElement(content, { slot: undefined })
  }

  if (content === undefined && required === true) {
    throw new Error(`Slot(${name}) is required`)
  }

  return <>{content ?? fallback ?? null}</>
}
