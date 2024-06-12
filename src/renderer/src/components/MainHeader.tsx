import { ipcMain } from "electron";

const MainHeader = () => {
  return (
    <header className={`w-full min-h-7 bg-[#24292e] drag outline-
    grid grid-cols-3 grid-rows-subgrid text-white text-xs`}>
      <BarStartItems />
      <BarCenterItems />
      <BarEndItems />
    </header>
  )
}

const BarStartItems = () => {
  return (
    <div className={`flex flex-grow h-full items-center justify-start`}>
      <TitleBarIcon />
      {/*<button className={`h-full px-2 hover:bg-white`}>文件</button>*/}
      {/*<button className={`h-full px-2 hover:bg-white`}>编辑</button>*/}
    </div>
  )
}

const BarCenterItems = () => {
  return <div className={`flex w-auto px-3 h-full items-center justify-center`}>Koi Launcher</div>
}

const BarEndItems = () => {

  const ipcHandle = (): void => window.electron.ipcRenderer.send('close')

  return <div className={`flex w-full h-full items-center justify-end`}>
    <button onClick={ipcHandle} className={`w-10 h-full hover:bg-red-500 transition-all flex items-center justify-center`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x"
           viewBox="0 0 16 16">
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg>
    </button>
  </div>
}

const TitleBarIcon = () => {
  return (
    <button className={`w-10 h-full mr-1 hover:bg-red-500 transition-all flex items-center justify-center`}>
      <svg
        className={`w-[1.5rem] h-full fill-white`}
        viewBox="0 0 64 64"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d=" M 14.00 16.00 C 18.00 16.00 22.00 16.00 26.00 16.00 C 26.00 18.75 26.00 24.25 26.00 27.00 L 25.00 27.00 L 25.00 28.00 C 21.33 28.00 17.67 28.00 14.00 28.00 C 14.00 24.00 14.00 20.00 14.00 16.00 Z" />
          <path d=" M 38.00 16.00 C 42.00 16.00 46.00 16.00 50.00 16.00 C 50.00 20.00 50.00 24.00 50.00 28.00 C 46.33 28.00 42.67 28.00 39.00 28.00 L 39.00 27.00 L 38.00 27.00 C 38.00 24.25 38.00 18.75 38.00 16.00 Z" />
          <path d=" M 26.00 28.00 C 30.00 28.00 34.00 28.00 38.00 28.00 C 38.00 29.50 38.00 32.50 38.00 34.00 C 39.50 34.00 42.50 34.00 44.00 34.00 C 44.00 40.00 44.00 46.00 44.00 52.00 C 42.50 52.00 39.50 52.00 38.00 52.00 C 38.00 50.50 38.00 47.50 38.00 46.00 C 34.00 46.00 30.00 46.00 26.00 46.00 C 26.00 47.50 26.00 50.50 26.00 52.00 C 24.50 52.00 21.50 52.00 20.00 52.00 C 20.00 46.00 20.00 40.00 20.00 34.00 C 21.50 34.00 24.50 34.00 26.00 34.00 C 26.00 32.50 26.00 29.50 26.00 28.00 Z" />
        </g>
      </svg>
    </button>
  )
}

export default MainHeader
