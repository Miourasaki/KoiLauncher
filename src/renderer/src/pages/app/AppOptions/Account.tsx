import AppItem from '../comp/AppItem'
import MicrosoftLogin from '../../../assets/img/icons/microsoft_logo_ee5c8d9fb6248c938fd0.svg'
import NEWS from '../../../assets/img/icons/news.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AppContext } from '../AppIndex'
import AppButton from '../comp/AppButton'
import { useTranslation } from 'react-i18next'

const Account = () => {
  const push = useNavigate()
  const { t } = useTranslation()
  const { accountType, setChangeOfflineIdMenu } = useContext(AppContext)

  const MicrosoftLogo = (): JSX.Element => {
    return <img src={MicrosoftLogin} alt="" className={`h-5`} />
  }
  const OfflineLogo = (): JSX.Element => {
    return (
      <div className={`flex items-center gap-1.5`}>
        <img src={NEWS} alt="" className={`h-5`} />
        <div>Off LINE</div>
        {accountType == 'offline' && (
          <span className={`text-[0.7rem] mb-0.5 rounded-sm bg-[#c88f9b] py-[0.1rem] px-1 ml-2.5`}>
            {t('meta.option.account.using')}
          </span>
        )}
      </div>
    )
  }

  // @ts-ignore
  const msAccountList = mainStorage.getItem('account.microsoftAccount')

  return (
    <>
      <AppItem title={<MicrosoftLogo />} margin={false}>
        <div className={`mt-3.5 w-[calc(100%-0.04rem)] -translate-x-[0.02rem]`}>
          {Object.keys(msAccountList).map((key: string) => (
            <MsAccountItem key={key} id={key} msAccount={msAccountList[key]} />
          ))}
        </div>
        <AppButton onClick={() => push('/auth/login')} className={`ml-9 mt-5 mb-8 px-3.5 w-auto`}>
          {t('meta.option.account.addAccount')}
        </AppButton>
      </AppItem>
      <AppItem title={<OfflineLogo />}>
        <div className={`mt-5 flex flex-col gap-2`}>
          <AppButton onClick={() => setChangeOfflineIdMenu(true)} className={`w-[38rem]`}>
            {t('meta.option.account.offline.changeId')}
          </AppButton>
          <AppButton
            onClick={() => {
              sessionStorage.clear()
              // @ts-ignore
              mainStorage.setItem('account.masterType', 'offline')
              push('/')
            }}
            changColor={true}
            className={`w-[38rem] bg-[#d98b9b] hover:bg-[#8c5964] border-0 mt-3`}
          >
            {t('meta.option.account.offline.use')}
          </AppButton>
        </div>
      </AppItem>
    </>
  )
}

const MsAccountItem = ({ id, msAccount }: { id: string; msAccount: any }) => {
  const { accountMeta } = useContext(AppContext)
  const push = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const isUsed = (id: string): boolean => {
    try {
      return accountMeta.accountProfile.id == id
    } catch (e) {
      return false
    }
  }

  return (
    <button
      onDoubleClick={() => {
        if (!isUsed(id) && !open) {
          sessionStorage.clear()
          // @ts-ignore
          mainStorage.setItem('account.masterType', `online:${id}`)
          push('/')
        }
      }}
      className={`w-full h-[4.2rem] pl-9 group overflow-hidden ${!open && 'hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10 focus:border focus:outline-0 focus:border-white'} transition-all`}
    >
      <div
        className={`border-b border-stone-600 h-full w-[38rem] relative flex items-center justify-between`}
      >
        <div
          className={`flex items-center justify-between w-full h-full transition-all ${open ? '-translate-x-[8.4rem]' : 'group-hover:bg-[#484848] group-focus:bg-[#484848]'} z-10 bg-[#333333]`}
        >
          <div className={`flex items-center w-full flex-grow`}>
            <img
              src={`https://minotar.net/helm/${msAccount.minecraftMeta.name}/600.png`}
              alt=""
              className={`w-9 rounded-full`}
            />
            <div className={`flex flex-col items-start ml-3.5 w-full`}>
              <div className={`font-bold text-base flex items-center`}>
                <div>{msAccount.minecraftMeta.name}</div>
                <div className={`ml-2`}>
                  {isUsed(id) && (
                    <span
                      className={`text-[0.7rem] mb-0.5 rounded-sm bg-[#c88f9b] py-[0.1rem] px-1`}
                    >
                      {t('meta.option.account.using')}
                    </span>
                  )}
                </div>
              </div>
              <div className={`text-xs text-stone-400 truncate max-w-96`}>
                {t('meta.option.account.owned')}
                {msAccount.ownedList.includes('game_minecraft') && '《Minecraft：Java Edition》'}
                {msAccount.ownedList.includes('game_minecraft_bedrock') &&
                  '《Minecraft：Bedrock Edition》'}
                {msAccount.ownedList.includes('game_dungeons') && '《Minecraft：Dungeons》'}
                {msAccount.ownedList.includes('game_legends') && '《Minecraft：Legends》'}
              </div>
            </div>
          </div>

          <AppButton onClick={() => setOpen(!open)} className={`${open && 'mr-5'}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg>
          </AppButton>
        </div>
        <div
          className={`absolute w-[8.4rem] h-[4.2rem] right-[1px] shadow-stone-900 flex shadow-inner justify-end ${open ? 'z-0' : '-z-10'}`}
        >
          <AppButton
            onClick={() => {
              push(`/app/account/${id}/microsoft#main`)
            }}
            className={`w-[4.15rem] h-[4.15rem]`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-gear-wide-connected"
              viewBox="0 0 16 16"
            >
              <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z" />
            </svg>
          </AppButton>
          <AppButton
            onClick={() => {
              if (isUsed(id)) {
                sessionStorage.clear()
                // @ts-ignore
                mainStorage.removeItem('account.masterType')
                // @ts-ignore
                mainStorage.removeItem('account.microsoftAccount.' + id)
                push('/auth/login')
              } else {
                // @ts-ignore
                mainStorage.removeItem('account.microsoftAccount.' + id)
                push(`${location.pathname}${location.hash}`)
              }
            }}
            changColor={true}
            className={`w-[4.15rem] h-[4.15rem] bg-red-900 bg-opacity-30 hover:bg-red-900 hover:bg-opacity-80`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            </svg>
          </AppButton>
        </div>
      </div>
    </button>
  )
}

export default Account
