import ReactSkinview3d from "react-skinview3d";
import { WalkingAnimation } from "skinview3d";

const Skin = ({msAccountMeta}:{msAccountMeta:any}) => {




  return (<div className={`w-full h-full flex items-center justify-center`}>

    <div className={`flex min-w-[42rem] h-5/6`}>
      <div className={`flex flex-col items-center w-52 border-r border-stone-500`}>
        <div className={`font-semibold mr-5`}>当前使用</div>
        <ReactSkinview3d
          width={`200`}
          height={`280`}
          className={`mr-5 mt-4`}
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
      <div className={`w-full h-full flex-grow ml-5`}></div>

    </div>

  </div>)
}

export default Skin
