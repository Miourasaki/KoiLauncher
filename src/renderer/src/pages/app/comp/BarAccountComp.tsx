import { useContext, useEffect, useState } from 'react'
import { NotificationContextCore } from '../../../components/notify/NotificationContext'
import defaultAvatar from '../../../assets/img/logo-koishi-100-export.png'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
// @ts-ignore
import MainCard from '../../../components/MainCard'
import gsap from 'gsap'
import { Card } from '../../../components/notify/Notification'
import { AppBarContext } from './AppBar'

const BarAccountComp = (): JSX.Element => {
  const { createNotification } = useContext(NotificationContextCore)
  const { t } = useTranslation()
  const push = useNavigate()

  const [bottomHover, setBottomHover] = useState<boolean>(true)

  useEffect(() => {}, [])

  const { accountMenu, setAccountMenu, accountName, setAccountName, accountType } =
    useContext(AppBarContext)

  const ChangeOfflineName = ({ classBool }: { classBool: boolean }): JSX.Element => {
    const [inputClass, setInputClass] = useState(false)

    return (
      <MainCard classBool={classBool} onClose={() => changeChangeOfflineId(false)}>
        <form
          onSubmit={(_) => {
            _.preventDefault()
            // @ts-ignore
            const formData = new FormData(_.target)
            const newId = formData.get('id') + ''

            if (newId == '' || !/^\w+$/.test(newId)) {
              setInputClass(true)
              const tl = gsap.timeline({ paused: true }) // 创建一个暂停的时间线

              tl.to(
                '#offline-id-input',
                { duration: 0.1, x: '-40px', ease: 'Power1.easeInOut' },
                'start'
              ) // 向左移动10px
                .to(
                  '#offline-id-input',
                  { duration: 0.1, x: '140px', ease: 'Power1.easeInOut' },
                  'start+=0.15'
                ) // 向右移动10px
                .to(
                  '#offline-id-input',
                  { duration: 0.1, x: '-20px', ease: 'Power1.easeInOut' },
                  'start+=0.25'
                ) // 向左移动5px，以减缓晃动
                .to(
                  '#offline-id-input',
                  { duration: 0.1, x: '70px', ease: 'Power1.easeInOut' },
                  'start+=0.35'
                ) // 向左移动5px，以减缓晃动
                .to(
                  '#offline-id-input',
                  { duration: 0.1, x: '0px', ease: 'Power1.easeInOut' },
                  'start+=0.45'
                ) // 回到初始位置
              tl.play() // 开始播放动画

              // 如果你希望动画只播放一次，可以在动画结束后停止时间线
              tl.eventCallback('onComplete', function () {
                tl.pause() // 动画完成后暂停时间线
              })
              return
            }

            const result = JSON.parse(atob(sessionStorage.getItem('accountMeta') + ''))
            result.accountProfile.id = newId
            result.accountProfile.name = newId

            setAccountName(newId)
            localStorage.setItem('account.offLine.id', newId)
            sessionStorage.setItem('accountMeta', btoa(JSON.stringify(result)))

            changeChangeOfflineId(false)
            createNotification(Card.success, `设置离线id为 ${newId}`)
          }}
          className={`w-full h-full px-10 py-14 flex flex-col justify-between items-start`}
        >
          <div className={`w-full`}>
            <div className={`tracking-wide text-2xl font-semibold`}>修改离线模式id</div>
            <div className={`mt-8`}>
              <input
                id={`offline-id-input`}
                name={`id`}
                className={` w-full h-9 bg-stone-800 shadow-inner border ${inputClass ? 'border-red-700 focus-visible:outline-red-700' : 'border-stone-700'} px-2 transition-all`}
              ></input>
            </div>
          </div>
          <div className={`w-full flex justify-end gap-2`}>
            <button className={`h-9 w-32 bg-[#d98b9b] hover:bg-[#3f282c] transition-all`}>
              好
            </button>
          </div>
        </form>
      </MainCard>
    )
  }
  const [changeOfflineId, setChangeOfflineId] = useState(false)
  const [changeOfflineIdClass, setChangeOfflineIdClass] = useState(false)
  const changeChangeOfflineId = (bool: boolean) => {
    if (bool) {
      setChangeOfflineIdClass(bool)
      setChangeOfflineId(bool)
    } else {
      setChangeOfflineIdClass(bool)
      setTimeout(() => setChangeOfflineId(bool), 200)
    }
  }
  const OfflineName = (): JSX.Element => {
    if (accountName == null)
      return (
        <button
          onClick={(_) => {
            _.stopPropagation()
            changeChangeOfflineId(!changeOfflineId)
            setBottomHover(true)
          }}
          disabled={buttonDisabled()}
          onMouseEnter={() => setBottomHover(false)}
          onMouseLeave={() => setBottomHover(true)}
          className={`text-stone-300 bg-stone-700 px-2 border-dashed border-black border hover:bg-stone-800 hover:shadow-inner transition-all`}
        >
          设置离线id
        </button>
      )

    return (
      <button
        onClick={(_) => {
          _.stopPropagation()
          changeChangeOfflineId(!changeOfflineId)
          setBottomHover(true)
        }}
        disabled={buttonDisabled()}
        onMouseEnter={() => setBottomHover(false)}
        onMouseLeave={() => setBottomHover(true)}
        className={`hover:bg-stone-700 hover:px-1.5 rounded-sm transition-all flex items-center`}
      >
        {accountName}
        <svg width="10" height="10" fill="currentColor" className="ml-2" viewBox="0 0 16 16">
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
        </svg>
      </button>
    )
  }

  useEffect(() => {
    const clickEvent = (_) => {
      if (_.target.id != 'account-menu') setAccountMenu(false)
    }
    document.addEventListener('click', clickEvent)

    return () => document.removeEventListener('click', clickEvent)
  }, [])
  const buttonDisabled = (): boolean => {
    return changeOfflineId
  }
  return (
    <>
      <button
        id={`account-menu`}
        onClick={() => setAccountMenu(!accountMenu)}
        disabled={buttonDisabled()}
        className={`group mt-2 w-full h-[3.3rem] transition-all flex justify-between items-center px-3.5 relative ${bottomHover && 'hover:bg-white hover:bg-opacity-20'}`}
      >
        <div className={`flex items-center`}>
          <img src={defaultAvatar} alt="" className={`w-8 rounded-full pointer-events-none`} />
          <div className={`ml-2 leading-5 flex flex-col items-start`}>
            <div className={`text-[0.9rem]`}>
              {accountName == '' ? (
                <div className={'screen-root-item w-24 h-4 mb-1 pointer-events-none'}></div>
              ) : accountType == 'offline' ? (
                <OfflineName />
              ) : (
                <div className={`pointer-events-none`}>{accountName}</div>
              )}
            </div>
            <div className={`text-xs text-stone-400 pointer-events-none`}>
              {accountType == '' ? (
                <div className={'screen-root-item w-16 h-3'}></div>
              ) : (
                t(`meta.account.type.${accountType}`)
              )}
            </div>
          </div>
        </div>
        <div
          className={`mb-3 group-hover:mb-2 transition-all ${accountMenu && 'rotate3d-account'} pointer-events-none`}
        >
          <svg className={`w-6`} viewBox="0 0 24 24">
            <path
              d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        {accountMenu && (
          <div
            className={`absolute w-9/12 h-10 accountMenu bg-stone-950 -bottom-2 translate-y-full shadow-stone-950 rounded-sm left-1/2 -translate-x-1/2`}
          ></div>
        )}
      </button>
      {changeOfflineId && <ChangeOfflineName classBool={changeOfflineIdClass} />}
    </>
  )
}

export default BarAccountComp
