import './Notification.css'
import { createContext, ReactNode, useState } from 'react'
import Notification, { Card } from './Notification'
import { useLocation } from 'react-router-dom'

interface NoteInterface {
  id: number
  card?: Card
  title?: string
  body?: string | ReactNode
}
export const NotificationContextCore = createContext<any>(null)

const NotificationContext = ({ children }: { children: ReactNode }): JSX.Element => {
  const [notifications, setNotifications] = useState<NoteInterface[]>([])
  const createNotification = (
    card: Card = Card.default,
    body: string | ReactNode = '',
    title?: string
  ): void => {
    setNotifications((notifications) => [
      {
        card,
        body,
        title,
        id: notifications.length
      },
      ...notifications
    ])
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteNotification = (id: number): void =>
    setNotifications(notifications.filter((notification) => notification.id !== id))

  const location = useLocation()

  return (
    <NotificationContextCore.Provider
      value={{
        notifications,
        createNotification
      }}
    >
      {children}
      <div
        className={`fixed right-0 overflow-y-auto ofhide max-h-full flex z-30
        ${location.pathname.split('/')[1] === 'app' ? 'bottom-5 flex-col-reverse' : 'top-14 flex-col'}`}
      >
        {notifications.map(({ id, card, title, body }) => {
          return (
            <Notification
              onDelete={() => {
                // deleteNotification(id)
              }}
              key={id}
              title={title}
              card={card}
            >
              {body}
            </Notification>
          )
        })}
      </div>
    </NotificationContextCore.Provider>
  )
}

export default NotificationContext
