import { ReactNode, ReactElement, isValidElement } from 'react'

export const getSlot = (
  children: ReactNode | ReactNode[],
  name: string
): ReactElement | undefined => {
  if (children !== undefined && children !== null) {
    if (Array.isArray(children)) {
      return (
        <>{children.find((x) => isValidElement(x) && x.props.slot === name)}</>
      )
    } else if (isValidElement(children) && children.props.slot === name) {
      return <>{children}</>
    }
  }
}

export const getDefaultSlot = (
  children: ReactNode | ReactNode[]
): ReactElement => {
  if (children !== undefined) {
    if (isValidElement(children)) {
      return <>{children.props.slot === undefined ? null : children}</>
    } else if (Array.isArray(children)) {
      return (
        <>
          {children.map((child) => {
            return isValidElement(child) && child.props.slot !== undefined
              ? null
              : child
          })}
        </>
      )
    }
  }
  return <>{children}</>
}
