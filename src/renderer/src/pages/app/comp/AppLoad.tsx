import AppButton from "./AppButton";
import Loading from "../../../components/Loading";
import { ReactNode } from "react";

const AppLoad = ({error, onReload, children}: {
  error: string
  onReload: () => void
  children: ReactNode;
}) => {


  return (<div className={`absolute w-full h-full top-0 left-0 bg-[#333333]`}>
    {children}

    <div
      className={`absolute top-0 left-0 w-full h-full bg-stone-800 bg-opacity-90 backdrop-blur-sm flex items-center justify-center`}>

      <div className={`mb-6 flex flex-col items-center`}>

        {error != "" ?
          <>
            <div className={`uppercase font-semibold`}>Error</div>
            <div className={`text-sm`}> {error == "" ?
              "未知错误"
              :
              error}</div>
            <AppButton
              onClick={() => {
                onReload();
              }}
              changColor={true}
              className={`px-3 w-auto h-auto py-1 bg-[#d98b9b] hover:bg-[#8c5964] border-0 mt-3`}
            >
              重试
            </AppButton>
          </>
          :
          <Loading border={false} />
        }
      </div>

    </div>
  </div>);

}

export default AppLoad
