import React, { useEffect, useRef, useState } from 'react'

import './Notification.css'
// import { createPortal } from 'react-dom'
//
// export function createContainer(): Element {
//   const portaId = 'notifyContainer'
//
//   let element = document.querySelector(`#${portaId}`)
//
//   if (element) {
//     return element
//   }
//
//   element = document.createElement('div')
//   element.setAttribute('id', portaId)
//   element.className = 'container'
//   document.body.appendChild(element)
//   return element
// }

export enum Card {
  default = 'none',
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error'
}

export interface NotificationProps {
  card?: Card
  onDelete: () => void
  title?: string
  children?: React.ReactNode
  closeTime?: number
}
// const container = createContainer()

const Notification: React.FC<NotificationProps> = ({
  card = Card.default,
  onDelete,
  title,
  children,
  closeTime = 3500
}) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const [isClosing, setIsClosing] = useState(false)

  const [mainEleHeight, setMainEleHeight] = useState(330)

  let timerPx: NodeJS.Timeout
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    if (isClosing) {
      const timerId = setTimeout(() => {
        if (mainRef.current) setMainEleHeight(mainRef.current.offsetHeight)
        timerPx = setInterval(() => {
          setMainEleHeight((i) => i - 10)
        }, 1)
      }, 250)
      return () => {
        clearTimeout(timerId)
      }
    }
  }, [isClosing, onDelete])

  useEffect(() => {
    if (mainEleHeight <= 0) {
      clearInterval(timerPx)
      setMainEleHeight(0)
      onDelete()
    }
  }, [mainEleHeight])

  useEffect(() => {
    let closeTimeout: NodeJS.Timeout
    if (closeTime > 0) {
      closeTimeout = setTimeout(() => setIsClosing(true), closeTime)
    }
    return () => {
      clearTimeout(closeTimeout)
    }
  }, [])

  return (
    <div style={{ maxHeight: `${mainEleHeight}px` }} className={`${mainEleHeight==0 && 'hidden'}`}>
      <div
        ref={mainRef}
        className={`notification flex bg-[#474747] mb-1.5 shadow-sm ${isClosing ? 'slideOut' : 'slideIn'}`}
      >
        <div className={`flex w-full`}>
          <div className={`bar ${card} min-w-[0.22rem] h-full`}></div>
          <div className={`pl-3 py-2 flex flex-col w-full`}>
            {title && <div className={`max-h-5 h-5 flex items-center mb-1.5 mt-0.5`}>{title}</div>}
            {title && <div className={`text-xs mt-0.5`}>{children}</div>}
            {!title && <div className={`text-sm mr-[2.16rem]`}>{children}</div>}
          </div>
        </div>
        <button
          onClick={(): void => setIsClosing(true)}
          className={`absolute h-9 w-9 right-0 top-0 hover:bg-red-500 flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="mt-[0.1rem]"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
      </div>
    </div>
  )
}
export default Notification
