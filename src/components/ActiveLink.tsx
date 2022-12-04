import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, cloneElement } from 'react'

interface ActiveLinkProps extends LinkProps{
  children: ReactElement
}

export function ActiveLink({ children, ...props }: ActiveLinkProps){
  const { asPath } = useRouter()

  const borderBottom = asPath === props.href ? { 
    content: '""',
    height: '3px',
    borderRadius: '3px 3px 0 0',
    width: '100%',
    position: 'absolute',
    bottom: '1px',
    left: 0,
    background: '#eba417',
  } : '';

  return (
    <Link {...props}>
      {cloneElement(children, {
        _after: borderBottom // style for borderBottom yellow
      })}
    </Link>
  )
}