import ReactSkinview3d from "react-skinview3d";
import { WalkingAnimation } from "skinview3d";
import { useRef } from "react";
import { Decrypt } from "../../../components/AES";

const Skin = ({msAccountMeta}:{msAccountMeta:any}) => {


  return (<div className={`w-full h-full flex items-center justify-center pr-6 pl-3`}>

    <div className={`flex w-full max-w-[49rem] h-5/6`}>
      <div className={`flex flex-col items-center w-52 border-r border-stone-500`}>
        <div className={`font-semibold mr-5`}>当前使用</div>
        <ReactSkinview3d
          width={`200`}
          height={`260`}
          className={`mr-5 mt-5`}
          skinUrl={msAccountMeta.minecraftMeta.skin}
          capeUrl={msAccountMeta.minecraftMeta.cape}
          onReady={({viewer}) => {
            viewer.animation = new WalkingAnimation()
            viewer.animation.speed = 0.6
            viewer.zoom = 1
            // viewer.autoRotate = true;
          }}
        />
      </div>
      <div className={`w-full h-full flex-grow  ml-8 flex flex-col items-center`}>
        <div className={`font-semibold mr-7`}>设置皮肤</div>
        <div className={`w-full`}>
            <div className={`mt-10 mb-3 font-semibold flex justify-center mr-7`}>披风设置</div>
          {/*{JSON.stringify()}*/}
          <div className={`flex gap-4 w-full items-start flex-wrap mb-10`}>
            <button
              onDoubleClick={() => {
                if (window.electron.ipcRenderer.sendSync('mojangApi:deleteCape', Decrypt(msAccountMeta.accessToken)))
                  location.reload()
              }}
              disabled={msAccountMeta.minecraftMeta.cape == null}
              className={`flex flex-col items-center pt-4 pb-2 transition-all bg-white hover:bg-opacity-10 max-w-[7.5rem] w-[7.5rem]
                ${msAccountMeta.minecraftMeta.cape == null ? "border border-green-400 bg-opacity-10" : "bg-opacity-5 focus:outline focus:outline-1"}`}>
              <SkinCanvas></SkinCanvas>
              <div className={`mt-2 text-sm truncate w-full flex justify-center
                ${msAccountMeta.minecraftMeta.cape == null ? "font-semibold" : "text-stone-400"}`}>无披风
              </div>
            </button>
            {msAccountMeta.minecraftMeta.capes.map((item: any) => (
              <button
                onDoubleClick={() => {
                  if (window.electron.ipcRenderer.sendSync('mojangApi:putCape', Decrypt(msAccountMeta.accessToken), item.id))
                    location.reload()
                }}
                disabled={item.state == "ACTIVE"}
                className={`flex flex-col items-center pt-4 pb-2 transition-all bg-white hover:bg-opacity-10 max-w-[7.5rem] w-[7.5rem]
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

  </div>)
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
