import './Notification.css'
import { createContext, ReactNode, useState } from 'react'
import Notification, { Card } from './Notification'

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

  return (
    <NotificationContextCore.Provider
      value={{
        createNotification
      }}
    >
      {children}
      <div
        className={`fixed top-14 right-0 overflow-y-auto ofhide max-h-full flex flex-col z-30`}
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
