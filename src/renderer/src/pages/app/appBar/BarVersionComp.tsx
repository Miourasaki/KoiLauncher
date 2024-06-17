import HomeImage from '../../../assets/img/head/fbb19e19c74df50c285883e54babecc9.webp'
import { Link, useLocation } from "react-router-dom";

const BarVersionComp = (): JSX.Element => {

  const location = useLocation();

  return (
    <Link
      to={'/app'}
      className={`relative mt-4 w-full min-h-16 border-stone-700 ${location.pathname == '/app' && 'border-stone-700 border-y'} transition-all flex justify-between items-center px-3.5 hover:bg-white hover:bg-opacity-15`}
    >
      <div className={`flex items-center`}>
        <img src={HomeImage} alt="" className={`w-10`} />
        <div className={`ml-2.5 leading-5 flex flex-col items-start`}>
          <div></div>
        </div>
      </div>
      <div></div>

      <span
        className={`bg-white   absolute w-1 left-0 duration-100 transition-all ${location.pathname == '/app' ? 'h-2/5' : 'h-0'}`}
      ></span>
    </Link>
  )
}

export default BarVersionComp
