import AppItem from '../comp/AppItem'
import AppSelect, { AppSelectList } from '../comp/AppSelect'
import { useTranslation } from 'react-i18next'
import { Card } from '../../../components/notify/Notification'
import { useContext } from 'react'
import { NotificationContextCore } from '../../../components/notify/NotificationContext'

const Launcher = () => {
  const { createNotification } = useContext(NotificationContextCore)
  const { t, i18n } = useTranslation()
  const i18nData = i18n.services.resourceStore.data

  return (
    <>
      <AppItem title={t('meta.option.launcher.language')}>
        <AppSelect selected={t('lang')}>
          {Object.keys(i18nData).map((key) => (
            <AppSelectList
              key={key}
              onSelect={() => {
                if (i18n.language != key)
                  i18n.changeLanguage(key).then(() => {
                    createNotification(
                      Card.success,
                      `${t('info.changeLang')} ${i18nData[key]['translation']['lang']}`
                    )

                    // @ts-ignore
                    mainStorage.setItem('launcher.option.language', key)
                    if (navigator.language == key) {
                      // @ts-ignore
                      mainStorage.setItem('launcher.option.language', 'system')
                    }
                  })
              }}
              isSelected={i18n.language == key}
            >
              {i18nData[key]['translation']['lang']}
            </AppSelectList>
          ))}
        </AppSelect>
      </AppItem>
    </>
  )
}

export default Launcher
