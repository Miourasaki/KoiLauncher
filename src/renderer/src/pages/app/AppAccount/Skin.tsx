import ReactSkinview3d from "react-skinview3d";
import { WalkingAnimation } from "skinview3d";
import { useRef } from "react";

const Skin = ({msAccountMeta}:{msAccountMeta:any}) => {



  return (<div className={`w-full h-full flex items-center justify-center px-10`}>

    <div className={`flex w-full max-w-[45rem] h-5/6`}>
      <div className={`flex flex-col items-center w-52 border-r border-stone-500`}>
        <div className={`font-semibold mr-10`}>当前使用</div>
        <ReactSkinview3d
          width={`200`}
          height={`260`}
          className={`mr-10 mt-5`}
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
      <div className={`w-full h-full flex-grow overflow-hidden ml-10 flex flex-col items-center`}>
        <div className={`font-semibold mr-10`}>当前使用</div>
        <div>
          {/*{JSON.stringify()}*/}

        </div>
        <div className={`mt-10 flex gap-4 w-full items-start `}>

          {msAccountMeta.minecraftMeta.capes.map((item: any) => (
            <div className={`flex flex-col items-center px-7 pt-4 pb-2 bg-white bg-opacity-10 max-w-[7.5rem] w-[7.5rem]`}>
              <SkinCanvas
                src={item.url} />
              <div className={`mt-1 text-sm truncate`}>{item.alias}</div>
            </div>
          ))}
        </div>
      </div>

    </div>

  </div>)
}

export const SkinCanvas = ({ src }: {
  src: string;
}) => {

  const canvas = useRef<HTMLCanvasElement>(null);

  const imageUrl = src;

// 创建一个新的Image对象
  const img = new Image();

// 当图片加载完成后
  img.onload = function() {

    const canvasItem = canvas.current

    if (canvasItem) {
      canvasItem.width = 80;
      canvasItem.height = 128;

      // 获取2D渲染上下文
      const ctx = canvasItem.getContext('2d');

      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        // 使用drawImage方法来绘制图片的一部分到canvas上
        // 参数分别为：源图片对象, 源图片的x坐标, 源图片的y坐标, 源图片的宽度, 源图片的高度, 绘制到canvas上的x坐标, 绘制到canvas上的y坐标, 绘制到canvas上的宽度, 绘制到canvas上的高度
        ctx.drawImage(img, 1, 1, 10, 16, 0, 0, 80, 128);

      }

    }
  };

// 设置图片的src属性来开始加载图片
  img.src = imageUrl;


  return <canvas ref={canvas} className={`w-16 h-[6.4rem] bg-[#444444]`}></canvas>

}

export default Skin
