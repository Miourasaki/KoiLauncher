import { useEffect, useState } from 'react'

const MainHeader = ({
  title = '',
  color = '#1e1e1e'
}: {
  title?: string
  close?: () => void
  color?: string
}): JSX.Element => {
  const BarStartItems = () => {
    return (
      <div className={`flex flex-grow h-full items-center justify-start`}>
        <TitleBarIcon />
        <div className={`mt-[0.12rem] font-[gh-Mona] ml-1`}>Koi Launcher</div>
      </div>
    )
  }

  const BarCenterItems = () => {
    return (
      <div
        className={`flex w-auto px-3 h-full items-center justify-center mt-[0.05rem] font-[gh-Mona]`}
      >
        {title}
      </div>
    )
  }

  const [maximize, setMaximize] = useState<boolean>(
    window.electron.ipcRenderer.sendSync('window:isMaximized')
  )
  useEffect(() => {
    if (maximize) window.electron.ipcRenderer.send(`window:maximize`)
    else window.electron.ipcRenderer.send(`window:unmaximize`)
  }, [maximize])
  window.electron.ipcRenderer.on('window:maximizeChange', (_, msg) => {
    setMaximize(msg)
  })
  const BarEndItems = () => {
    return (
      <div className={`flex w-full h-full items-center justify-end`}>
        <button
          onClick={() => window.electron.ipcRenderer.send('window:minimize')}
          className={`w-10 h-full hover:bg-white hover:text-[#a0a0a0] transition-all flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="mt-[0.1rem]"
            viewBox="0 0 16 16"
          >
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
          </svg>
        </button>
        <button
          onClick={() => setMaximize(!maximize)}
          className={`w-10 h-full hover:bg-white hover:text-[#a0a0a0] transition-all flex items-center justify-center`}
        >
          {/*{ ? 'true' : 'false'}*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={maximize ? '13' : '12'}
            height={maximize ? '13' : '12'}
            fill="currentColor"
            className="mt-[0.1rem]"
            viewBox="0 0 16 16"
          >
            {maximize ? (
              <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z" />
            ) : (
              <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5" />
            )}
          </svg>
        </button>
        <button
          onClick={() => window.electron.ipcRenderer.send('window:close')}
          className={`w-10 h-full hover:bg-red-500 transition-all flex items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="currentColor"
            className="mt-[0.1rem]"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
      </div>
    )
  }

  const TitleBarIcon = () => {
    return (
      <button
        onClick={() => {
          window.electron.ipcRenderer.send('window:openAbout')
        }}
        className={`w-10 h-full transition-all flex items-center justify-center
        fill-white group`}
        // ${openHeader ? 'hover:bg-white fill-white hover:fill-black' : 'hover:bg-black fill-black hover:fill-white'}`}
      >
        {/*<svg*/}
        {/*  className={`w-[1.5rem] h-full`}*/}
        {/*  viewBox="0 0 64 64"*/}
        {/*  version="1.1"*/}
        {/*  xmlns="http://www.w3.org/2000/svg"*/}
        {/*>*/}
        {/*  <g>*/}
        {/*    <path d=" M 14.00 16.00 C 18.00 16.00 22.00 16.00 26.00 16.00 C 26.00 18.75 26.00 24.25 26.00 27.00 L 25.00 27.00 L 25.00 28.00 C 21.33 28.00 17.67 28.00 14.00 28.00 C 14.00 24.00 14.00 20.00 14.00 16.00 Z" />*/}
        {/*    <path d=" M 38.00 16.00 C 42.00 16.00 46.00 16.00 50.00 16.00 C 50.00 20.00 50.00 24.00 50.00 28.00 C 46.33 28.00 42.67 28.00 39.00 28.00 L 39.00 27.00 L 38.00 27.00 C 38.00 24.25 38.00 18.75 38.00 16.00 Z" />*/}
        {/*    <path d=" M 26.00 28.00 C 30.00 28.00 34.00 28.00 38.00 28.00 C 38.00 29.50 38.00 32.50 38.00 34.00 C 39.50 34.00 42.50 34.00 44.00 34.00 C 44.00 40.00 44.00 46.00 44.00 52.00 C 42.50 52.00 39.50 52.00 38.00 52.00 C 38.00 50.50 38.00 47.50 38.00 46.00 C 34.00 46.00 30.00 46.00 26.00 46.00 C 26.00 47.50 26.00 50.50 26.00 52.00 C 24.50 52.00 21.50 52.00 20.00 52.00 C 20.00 46.00 20.00 40.00 20.00 34.00 C 21.50 34.00 24.50 34.00 26.00 34.00 C 26.00 32.50 26.00 29.50 26.00 28.00 Z" />*/}
        {/*  </g>*/}
        {/*</svg>*/}
        <svg
          className={`w-[1.15rem] h-full`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          version="1.1"
        >
          <g id="#010103fb">
            <path
              className={`fill-[#26292d00] group-hove r:fill-white`}
              opacity="1.00"
              d=" M 12.46 2.50 C 21.98 -0.72 32.12 9.45 29.95 18.95 C 28.32 26.95 18.58 32.95 10.98 29.01 C 4.92 26.58 0.58 19.70 2.10 13.15 C 3.72 8.35 7.26 3.63 12.46 2.50 M 2.27 18.72 C 5.79 18.28 9.61 18.37 12.86 16.83 C 15.60 15.51 18.31 14.13 21.11 12.97 C 22.90 11.52 24.61 9.98 26.27 8.39 C 24.87 7.28 23.47 6.19 22.05 5.10 C 20.97 4.31 19.88 3.52 18.81 2.71 C 9.93 2.63 2.70 9.87 2.27 18.72 M 23.51 15.32 C 23.98 16.12 24.45 16.92 24.92 17.73 C 22.66 17.19 20.38 16.75 18.08 16.47 C 18.77 18.22 19.47 19.96 20.19 21.70 C 18.04 20.36 15.85 19.07 13.50 18.11 C 13.65 19.76 13.81 21.40 13.95 23.04 C 13.28 22.24 12.62 21.43 11.96 20.63 C 10.37 21.11 8.78 21.59 7.15 21.95 L 7.09 22.25 C 5.31 19.23 3.81 24.99 6.80 23.61 L 6.60 24.46 L 7.70 24.80 C 10.68 26.39 13.42 29.27 17.03 29.13 C 22.50 27.12 27.44 23.76 28.95 17.90 C 29.03 15.93 28.85 13.97 28.70 12.01 C 27.03 13.21 25.31 14.32 23.51 15.32 Z"
            />
          </g>
          <g id="#34527afe">
            <path
              opacity="1.00"
              d=" M 2.27 18.72 C 2.70 9.87 9.93 2.63 18.81 2.71 C 18.91 8.06 16.81 13.20 12.86 16.83 C 9.61 18.37 5.79 18.28 2.27 18.72 Z"
            />
          </g>
          <g id="#34347aff">
            <path
              opacity="1.00"
              d=" M 18.81 2.71 C 19.88 3.52 20.97 4.31 22.05 5.10 C 21.74 7.72 21.42 10.34 21.11 12.97 C 18.31 14.13 15.60 15.51 12.86 16.83 C 16.81 13.20 18.91 8.06 18.81 2.71 Z"
            />
            <path
              opacity="1.00"
              d=" M 7.70 24.80 C 11.15 25.82 14.52 27.10 17.82 28.53 L 17.03 29.13 C 13.42 29.27 10.68 26.39 7.70 24.80 Z"
            />
          </g>
          <g id="#231758ff">
            <path
              opacity="1.00"
              d=" M 22.05 5.10 C 23.47 6.19 24.87 7.28 26.27 8.39 C 24.61 9.98 22.90 11.52 21.11 12.97 C 21.42 10.34 21.74 7.72 22.05 5.10 Z"
            />
            <path
              opacity="1.00"
              d=" M 6.80 23.61 C 3.81 24.99 5.31 19.23 7.09 22.25 C 7.02 22.59 6.87 23.27 6.80 23.61 Z"
            />
          </g>
          <g id="#325078ff">
            <path
              opacity="1.00"
              d=" M 23.51 15.32 C 25.31 14.32 27.03 13.21 28.70 12.01 C 28.85 13.97 29.03 15.93 28.95 17.90 C 25.86 22.04 21.85 25.35 17.82 28.53 C 14.52 27.10 11.15 25.82 7.70 24.80 L 6.60 24.46 L 6.80 23.61 C 6.87 23.27 7.02 22.59 7.09 22.25 L 7.15 21.95 C 8.78 21.59 10.37 21.11 11.96 20.63 C 12.62 21.43 13.28 22.24 13.95 23.04 C 13.81 21.40 13.65 19.76 13.50 18.11 C 15.85 19.07 18.04 20.36 20.19 21.70 C 19.47 19.96 18.77 18.22 18.08 16.47 C 20.38 16.75 22.66 17.19 24.92 17.73 C 24.45 16.92 23.98 16.12 23.51 15.32 Z"
            />
          </g>
          <g id="#25235dff">
            <path
              opacity="1.00"
              d=" M 17.82 28.53 C 21.85 25.35 25.86 22.04 28.95 17.90 C 27.44 23.76 22.50 27.12 17.03 29.13 L 17.82 28.53 Z"
            />
          </g>
        </svg>
      </button>
    )
  }

  return (
    <header
      style={{ background: color }}
      className={`w-full min-h-[calc(1.75rem+1px)] drag border border-stone-900 z-50
    grid grid-cols-3 grid-rows-subgrid text-white text-xs`}
    >
      <BarStartItems />
      <BarCenterItems />
      <BarEndItems />
    </header>
  )
}

export default MainHeader
