import ReactSkinview3d from "react-skinview3d";
import { WalkingAnimation } from "skinview3d";
import { useContext, useEffect, useRef, useState } from "react";
import { Decrypt, Encrypt } from "../../../components/AES";
import { useTranslation } from "react-i18next";
import { MainContext } from "../../../components/CoreContext";
// @ts-ignore
import AppLoad from '../comp/AppLoad';
import AppButton from "../comp/AppButton";
import MainCard from "../../../components/MainCard";

const Skin = ({paramId}:{paramId:any}) => {
  const { setAccountMetaDef } = useContext(MainContext)
  const {t} = useTranslation()

  const getMeta = true
  const [load, setLoad] = useState(getMeta)
  const [error, setError] = useState('')
  // @ts-ignore
  const [msAccountMeta, setMsAccountMeta] = useState<any>(mainStorage.getItem('account.microsoftAccount.' + paramId))

  useEffect(() => {
    window.electron.ipcRenderer.on('auth:ms-out', (_event, msg) => {
      if (typeof msg === 'string') {
        const args = msg.split(':')
        if (args[0] == 'error') {
          const textArgs = args[1].split('|')
          if (textArgs.length > 1) {
            if (textArgs[0] == 'i18n') {
              setError(t(textArgs[1]))
            }
          } else {
            setError(`${t('error.prefix')}: ${args[1]}`)
          }
        }
      } else {
        setAccountMetaDef(msg, false)

        const mcSkins: any[] = msg.minecraftMeta.minecraftAccessMeta.profileMeta.skins
        let mcSkin: string | null = null
        let index = 0
        while (index < mcSkins.length) {
          if (mcSkins[index]['state'] == 'ACTIVE') mcSkin = mcSkins[index]['url']
          index++
        }
        const mcCapes: any[] = msg.minecraftMeta.minecraftAccessMeta.profileMeta.capes
        let mcCape: string | null = null
        index = 0
        while (index < mcCapes.length) {
          if (mcCapes[index]['state'] == 'ACTIVE') mcCape = mcCapes[index]['url']
          index++
        }

        setMsAccountMeta({
          refreshToken: Encrypt(msg.microsoftMeta.refreshToken),
          accessToken: Encrypt(msg.minecraftMeta.minecraftToken),
          skin: {
            active: mcSkin,
            list: mcSkins
          },
          cape: {
            active: mcCape,
            list: mcCapes
          }
        })
        setLoad(false)
        setError('')
      }
    })

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('auth:ms-out')
    }
  }, [])
  useEffect(()=>{
    if (getMeta) reload()
  },[])
  const reload = () => {
    setLoad(true)
    setError('')
    window.electron.ipcRenderer.send('auth:ms-in', [Decrypt(msAccountMeta.refreshToken), Decrypt(msAccountMeta.accessToken)])
  }



  const [changSkin, setChangSkin] = useState(false)


  if (load) {
    return <AppLoad error={error} onReload={reload}>
      <div className={`px-9 py-10`}>
        <div className={`flex`}>
          <div className={"screen-root-item w-52 h-72 mb-1.5 mr-4"}></div>
          <div className={`w-full flex-grow`}>
            <div className={"screen-root-item w-full h-40 mb-1.5 mt-1"}></div>
            <div className={`flex gap-2`}>
              <div className={"screen-root-item w-1/4 h-40 mb-1.5"}></div>
              <div className={"screen-root-item w-1/4 h-40 mb-1.5"}></div>
              <div className={"screen-root-item w-1/4 h-40 mb-1.5"}></div>
            </div>
          </div>
        </div>
      </div>
    </AppLoad>
  }
  return (<><div className={`w-full h-full flex items-center justify-center pr-6 pl-3`}>
    <div className={`flex w-full max-w-[49rem] h-5/6`}>
      <div className={`flex flex-col items-center w-52 border-r border-stone-500`}>
        <div className={`font-semibold mr-5`}>当前使用</div>
        <ReactSkinview3d
          width={`200`}
          height={`260`}
          className={`mr-5 mt-5`}
          skinUrl={msAccountMeta.skin.active}
          capeUrl={msAccountMeta.cape.active}
          onReady={({ viewer }) => {
            viewer.animation = new WalkingAnimation();
            viewer.animation.speed = 0.6;
            viewer.zoom = 1;
            // viewer.autoRotate = true;
          }}
        />
      </div>
      <div className={`w-full h-full flex-grow  ml-8 flex flex-col items-center`}>
        <div className={`font-semibold`}>设置皮肤</div>
        <MainCard open={changSkin} onClose={()=> setChangSkin(false)} />

        <AppButton onClick={() => setChangSkin(true)} className={`w-full h-20 mt-3`}>
          <div className={`flex gap-3 items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
                 className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
            </svg>
            <div className={`text-xl font-semibold`}>上传皮肤</div>
          </div>
        </AppButton>
        <div className={`w-full`}>
          <div className={`mt-10 mb-3 font-semibold flex justify-center`}>披风设置</div>
          <div className={`flex gap-4 w-full items-start flex-wrap mb-10`}>
            <button
              onDoubleClick={() => {
                const result = window.electron.ipcRenderer.sendSync("mojangApi:deleteCape", Decrypt(msAccountMeta.accessToken));
                if (result)
                  reload();
              }}
              disabled={msAccountMeta.cape.active == null}
              className={`flex flex-col items-center pt-4 pb-2 transition-all bg-white hover:bg-opacity-10 w-32
                ${msAccountMeta.cape.active == null ? "border border-green-400 bg-opacity-10" : "bg-opacity-5 focus:outline focus:outline-1"}`}>
              <SkinCanvas></SkinCanvas>
              <div className={`mt-2 text-sm truncate w-full flex justify-center
                ${msAccountMeta.cape.active == null ? "font-semibold" : "text-stone-400"}`}>无披风
              </div>
            </button>
            {msAccountMeta.cape.list.map((item: any) => (
              <button
                onDoubleClick={() => {
                  const result = window.electron.ipcRenderer.sendSync('mojangApi:putCape', Decrypt(msAccountMeta.accessToken), item.id)
                  if (result)
                    reload()
                }}
                disabled={item.state == "ACTIVE"}
                className={`flex flex-col items-center pt-4 pb-2 transition-all bg-white hover:bg-opacity-10 w-32
                ${item.state == "ACTIVE" ? "border border-green-400 bg-opacity-10" : "bg-opacity-5 focus:outline focus:outline-1"}`}>
                <SkinCanvas
                  src={item.url} />
                <div className={`mt-2 text-sm truncate w-full flex justify-center
                ${item.state == "ACTIVE" ? "font-semibold" : "text-stone-400"}`}>{item.alias}</div>
              </button>
            ))}
          </div>

        </div>
      </div>

    </div>
  </div>
  </>)
}

export const SkinCanvas = ({ src }: {
  src?: string;
}) => {

  const canvas = useRef<HTMLCanvasElement>(null);

  const imageUrl = src;

// 创建一个新的Image对象
  const img = new Image();

// 当图片加载完成后
  img.onload = function() {

    const canvasItem = canvas.current;

    if (canvasItem) {
      canvasItem.width = 80;
      canvasItem.height = 128;

      // 获取2D渲染上下文
      const ctx = canvasItem.getContext("2d");

      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        // 使用drawImage方法来绘制图片的一部分到canvas上
        // 参数分别为：源图片对象, 源图片的x坐标, 源图片的y坐标, 源图片的宽度, 源图片的高度, 绘制到canvas上的x坐标, 绘制到canvas上的y坐标, 绘制到canvas上的宽度, 绘制到canvas上的高度
        ctx.drawImage(img, 1, 1, 10, 16, 0, 0, 80, 128);

      }

    }
  };

// 设置图片的src属性来开始加载图片
  if (imageUrl) img.src = imageUrl;


  return <canvas ref={canvas} className={`w-16 h-[6.4rem] bg-[#444444]`}></canvas>

}

export default Skin
