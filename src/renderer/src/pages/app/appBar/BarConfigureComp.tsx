import HomeImage from '../../../assets/img/head/fbb19e19c74df50c285883e54babecc9.webp'
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const BarConfigureComp = (): JSX.Element => {
  const location = useLocation()
  const push = useNavigate()

  const [choice, setChoice] = useState(false)
  const getChoice = () => {return location.pathname == "/app" && choice}

  return (<>
    <button
      onClick={() => push("/app")}
      className={`relative mt-4 w-full min-h-16 max-h-16 flex-grow border-stone-700 ${location.pathname == "/app" ? "bg-white bg-opacity-5 border-y border-stone-600 cursor-default" : 'hover:bg-white hover:bg-opacity-15'} transition-all flex justify-between items-center pl-4`}
    >
      <div className={`flex items-center`}>
        <img src={HomeImage} alt="" className={`w-9`} />
        <div className={`ml-2.5 flex flex-col items-start ${location.pathname == "/app" ? "font-semibold" : 'tracking-wide'}`}>
          <div className={`text-[0.7rem] uppercase translate-y-[0.08rem]`}>Minecraft:</div>
          <div className={`text-sm -translate-y-[0.08rem]`}>Java Edition</div>
        </div>
      </div>


      <button
        onClick={() => {setChoice(!choice)}}
        className={`z-10 h-full w-3 border-stone-600 hover:bg-stone-700 transition-all flex justify-center items-center ${location.pathname == "/app" ? "bg-white bg-opacity-5 border-x border-stone-600" : 'hover:bg-white hover:bg-opacity-15 mr-3'} ${choice && 'rotate3d-account'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down"
             viewBox="0 0 16 16">
          <path fillRule="evenodd"
                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
        </svg>
      </button>


      <span
        className={`bg-white absolute w-1 left-0 duration-100 transition-all ${location.pathname == "/app" ? "h-2/5" : "h-0"}`}
      ></span>
    </button>

    <div className={`overflow-y-auto top-[9.5rem] w-52 absolute bg-[#1e1e1e] z-10 ${getChoice() ? 'h-[calc(100vh-20rem)]' : 'h-0'} transition-all`}></div>
  </>)
}

export default BarConfigureComp
