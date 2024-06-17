import AppItem from '../comp/AppItem'
import MicrosoftLogin from '../../../assets/img/icons/microsoft_logo_ee5c8d9fb6248c938fd0.svg'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../AppIndex'

const Launcher = () => {
  const push = useNavigate()
  const { accountMeta } = useContext(AppContext)

  const MicrosoftLogo = (): JSX.Element => {
    return <img src={MicrosoftLogin} alt="" className={`h-5`} />
  }

  // @ts-ignore
  const msAccountList = mainStorage.getItem('account.microsoftAccount')
  const isUsed = (key: string): boolean => {
    try {
      return accountMeta.accountProfile.id == key
    } catch (e) {
      return false
    }
  }

  return (
    <>
      <AppItem title={<MicrosoftLogo />} margin={false}>
        <div className={`mt-3.5`}>
          {Object.keys(msAccountList).map((key: string) => (
            <button
              onDoubleClick={() => {
                if (!isUsed(key)) {
                  sessionStorage.clear()
                  // @ts-ignore
                  mainStorage.setItem('account.masterType', `online:${key}`)
                  push('/')
                }
              }}
              key={key}
              className={`w-full h-[4.2rem] pl-9 hover:bg-white hover:bg-opacity-10 focus:bg-white focus:bg-opacity-10 focus:border focus:outline-0 focus:border-white transition-all`}
            >
              <div
                className={`border-b border-stone-600 h-full w-[38rem] flex items-center justify-between`}
              >
                <div className={`flex items-center w-full flex-grow`}>
                  <img
                    src={`https://minotar.net/helm/${msAccountList[key].minecraftMeta.name}/600.png`}
                    alt=""
                    className={`w-9 rounded-full`}
                  />
                  <div className={`flex flex-col items-start ml-3.5 w-full`}>
                    <div className={`font-bold text-base flex items-center`}>
                      <div>{msAccountList[key].minecraftMeta.name}</div>
                      <div className={`ml-2`}>
                        {isUsed(key) && (
                          <span
                            className={`text-[0.7rem] mb-0.5 rounded-sm bg-[#c88f9b] py-[0.1rem] px-1`}
                          >
                            使用中
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={`text-xs text-stone-400 truncate max-w-96`}>
                      已购：
                      {'game_minecraft'.indexOf(msAccountList[key].ownedList) &&
                        '《Minecraft：Java Edition》'}
                      {'game_minecraft_bedrock'.indexOf(msAccountList[key].ownedList) &&
                        '《Minecraft：Bedrock Edition》'}
                      {'game_dungeons'.indexOf(msAccountList[key].ownedList) &&
                        '《Minecraft：Dungeons》'}
                      {'game_legends'.indexOf(msAccountList[key].ownedList) &&
                        '《Minecraft：Legends》'}
                    </div>
                  </div>
                </div>

                <button
                  className={`w-8 h-8 border border-stone-400 hover:bg-white hover:bg-opacity-25 transition-all flex items-center justify-center`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-gear-wide-connected"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z" />
                  </svg>
                </button>
              </div>
            </button>
          ))}
        </div>
      </AppItem>
    </>
  )
}

export default Launcher
