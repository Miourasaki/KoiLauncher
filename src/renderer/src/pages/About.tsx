import { useEffect, useRef, useState } from 'react'

// @ts-ignore
const version = __APP_VERSION__

function About(): JSX.Element {
  const mainRef = useRef<HTMLDivElement>(null)

  const [uuddlrlrbaba, setUuddlrlrbaba] = useState(0)
  const [end, setEnd] = useState(false)

  useEffect(() => {
    document.addEventListener('keydown', defKeyDown)
    return () => document.removeEventListener('keydown', defKeyDown)
  })

  const defKeyDown = (e: KeyboardEvent): void => {
    let reset = true
    if (end) return
    if (e.key === 'ArrowUp') {
      if (uuddlrlrbaba <= 1) {
        setUuddlrlrbaba(uuddlrlrbaba + 1)
        reset = false
      }
      if (uuddlrlrbaba > 1) {
        setUuddlrlrbaba(1)
        reset = false
      }

      mainRef.current?.classList.toggle('-translate-y-10')
      setTimeout(() => {
        mainRef.current?.classList.toggle('-translate-y-10')
      }, 100)
    } else if (e.key === 'ArrowDown') {
      if (uuddlrlrbaba <= 3 && uuddlrlrbaba > 1) {
        setUuddlrlrbaba(uuddlrlrbaba + 1)
        reset = false
      }

      mainRef.current?.classList.toggle('translate-y-10')
      setTimeout(() => {
        mainRef.current?.classList.toggle('translate-y-10')
      }, 100)
    } else if (e.key === 'ArrowLeft') {
      if (uuddlrlrbaba == 4 || uuddlrlrbaba == 6) {
        setUuddlrlrbaba(uuddlrlrbaba + 1)
        reset = false
      }

      mainRef.current?.classList.toggle('-translate-x-10')
      setTimeout(() => {
        mainRef.current?.classList.toggle('-translate-x-10')
      }, 100)
    } else if (e.key === 'ArrowRight') {
      if (uuddlrlrbaba == 5 || uuddlrlrbaba == 7) {
        setUuddlrlrbaba(uuddlrlrbaba + 1)
        reset = false
      }

      mainRef.current?.classList.toggle('translate-x-10')
      setTimeout(() => {
        mainRef.current?.classList.toggle('translate-x-10')
      }, 100)
    } else if (e.key === 'Enter') {
      if (uuddlrlrbaba == 12) {
        mainRef.current?.classList.add('rotate-[360deg]')
        alert('你想玩小游戏吗？')
        e.preventDefault()
        setEnd(true)
      }
    } else {
      if (e.key === 'B' || e.key === 'b') {
        if (uuddlrlrbaba == 8 || uuddlrlrbaba == 10) {
          setUuddlrlrbaba(uuddlrlrbaba + 1)
          reset = false
        }
      }
      if (e.key === 'A' || e.key === 'a') {
        if (uuddlrlrbaba == 9 || uuddlrlrbaba == 11) {
          setUuddlrlrbaba(uuddlrlrbaba + 1)
          reset = false
        }
      }

      mainRef.current?.classList.toggle('scale-[0.8]')
      setTimeout(() => {
        mainRef.current?.classList.toggle('scale-[0.8]')
        mainRef.current?.classList.toggle('scale-[1.1]')
      }, 90)
      setTimeout(() => {
        mainRef.current?.classList.toggle('scale-[1.1]')
      }, 150)
    }

    if (reset) setUuddlrlrbaba(0)
  }

  return (
    <main
      className={`w-full h-full relative drag font-[gh-Mona]`}
      style={{ background: '#212121' }}
    >
      <div
        ref={mainRef}
        className={`w-full h-full flex-grow flex px-8 py-6 text-white flex-col transition-all duration-100`}
      >
        <div className={`w-full flex justify-between items-center`}>
          <a
            href={'https://koil.miourasaki.net'}
            target={'_blank'}
            className={`flex items-center gap-3.5`}
            rel="noreferrer"
          >
            <img
              className={`w-9`}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABrElEQVR4AeXB243bUAxAwWPi9sLKWAKrYAmsjNU40IcAY7FxJF3Jj3DmVpF3GhOaE5oTmhOaE5oTmhOaE5oTmhOaG7yBuvFMRfIqQnODi6kbe6kbq4rkSoMLqBtnUTdWFcnZhOYGJ1I3rqRuLCqSswxOoG68krqxqEhmCc0Jk9SNd1E3ZgnNDQ5SN96tIpk1+EIVyVmE5oQD1I3/hdDc4EtUJM+oG4uKZI/BDurGK1QkW6kbj9SNimQrobnBh6hItlI3VhXJQt04YvBmFclW6sZP6sYMobnBG1QkW6gbq4rkCkJzgxepSP5F3fgbdaMieaRuzLpV5J2d1I1VRTJD3VhUJCt1Y0ZFspXQ3OCAiuQIdePTCM3dKvLOhdSNRUWyUjd+U5E8Ujf2qkj2GBygbjxTkagbj9SNiuQZdWNRkexVkRwhNCccUJE8o27MUDfUjVe4VeSdCerGO1UkM4TmhEkVyTcTmht8oYrkLIMTVCQLdeNKFcnZhOYGJ6pIflI3ZlQkVxKaG1ysIlmpG3tUJFcbvFBF8mmE5oTmhOaE5oTmhOaE5oTmhOaE5v4AZBiHoCZt97QAAAAASUVORK5CYII="
              alt=""
            />
            <div className={`flex flex-col items-start justify-center`}>
              <div className={`text-lg uppercase tracking-widest`}>Koi Launcher</div>
              <div className={`text-xs text-stone-400`}>Alpha Twefour ({version})</div>
            </div>
          </a>
          <div>
            <button
              onClick={() => window.electron.ipcRenderer.send('window:closeAbout')}
              className={`w-9 h-9 hover:bg-red-500 transition-all flex items-center justify-center translate-x-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="mt-[0.1rem]"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`py-4 gap-1 tracking-wide flex flex-col justify-between h-full`}>
          <div className={`text-stone-300 text-[0.8rem] flex flex-col gap-1`}>
            <a
              href={'https://apache.org/licenses/LICENSE-2.0'}
              target={'_blank'}
              // onClick={() => window.electron.ipcRenderer.send('window:openLicense')}
              className={`flex items-center hover:text-white transition-all`}
              rel="noreferrer"
            >
              <div className={`w-[1.1rem] mr-3 text-white`}>
                <svg className={'w-full'} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.75 2.75V4.5h1.975c.351 0 .694.106.984.303l1.697 1.154c.041.028.09.043.14.043h4.102a.75.75 0 0 1 0 1.5H20.07l3.366 7.68a.749.749 0 0 1-.23.896c-.1.074-.203.143-.31.206a6.296 6.296 0 0 1-.79.399 7.349 7.349 0 0 1-2.856.569 7.343 7.343 0 0 1-2.855-.568 6.205 6.205 0 0 1-.79-.4 3.205 3.205 0 0 1-.307-.202l-.005-.004a.749.749 0 0 1-.23-.896l3.368-7.68h-.886c-.351 0-.694-.106-.984-.303l-1.697-1.154a.246.246 0 0 0-.14-.043H12.75v14.5h4.487a.75.75 0 0 1 0 1.5H6.763a.75.75 0 0 1 0-1.5h4.487V6H9.275a.249.249 0 0 0-.14.043L7.439 7.197c-.29.197-.633.303-.984.303h-.886l3.368 7.68a.75.75 0 0 1-.209.878c-.08.065-.16.126-.31.223a6.077 6.077 0 0 1-.792.433 6.924 6.924 0 0 1-2.876.62 6.913 6.913 0 0 1-2.876-.62 6.077 6.077 0 0 1-.792-.433 3.483 3.483 0 0 1-.309-.221.762.762 0 0 1-.21-.88L3.93 7.5H2.353a.75.75 0 0 1 0-1.5h4.102c.05 0 .099-.015.141-.043l1.695-1.154c.29-.198.634-.303.985-.303h1.974V2.75a.75.75 0 0 1 1.5 0ZM2.193 15.198a5.414 5.414 0 0 0 2.557.635 5.414 5.414 0 0 0 2.557-.635L4.75 9.368Zm14.51-.024c.082.04.174.083.275.126.53.223 1.305.45 2.272.45a5.847 5.847 0 0 0 2.547-.576L19.25 9.367Z"></path>
                </svg>
              </div>
              <div className={`mt-0.5`}>Apache License 2.0</div>
            </a>
            <a
              href={'https://policy.miourasaki.net/koilauncher/service'}
              target={'_blank'}
              className={`flex items-center hover:text-white transition-all`}
              rel="noreferrer"
            >
              <div className={`w-[1rem] mr-[0.8rem] ml-[0.05rem] text-white`}>
                <svg className={'w-full'} viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"></path>
                </svg>
              </div>
              <div className={`mt-0.5`}>Terms of Service</div>
            </a>
            <a
              href={'https://policy.miourasaki.net/koilauncher/privacy'}
              target={'_blank'}
              className={`flex items-center hover:text-white transition-all`}
              rel="noreferrer"
            >
              <div className={`w-[1.1rem] mr-3 text-white`}>
                <svg className={'w-full'} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.75 2.75V4.5h1.975c.351 0 .694.106.984.303l1.697 1.154c.041.028.09.043.14.043h4.102a.75.75 0 0 1 0 1.5H20.07l3.366 7.68a.749.749 0 0 1-.23.896c-.1.074-.203.143-.31.206a6.296 6.296 0 0 1-.79.399 7.349 7.349 0 0 1-2.856.569 7.343 7.343 0 0 1-2.855-.568 6.205 6.205 0 0 1-.79-.4 3.205 3.205 0 0 1-.307-.202l-.005-.004a.749.749 0 0 1-.23-.896l3.368-7.68h-.886c-.351 0-.694-.106-.984-.303l-1.697-1.154a.246.246 0 0 0-.14-.043H12.75v14.5h4.487a.75.75 0 0 1 0 1.5H6.763a.75.75 0 0 1 0-1.5h4.487V6H9.275a.249.249 0 0 0-.14.043L7.439 7.197c-.29.197-.633.303-.984.303h-.886l3.368 7.68a.75.75 0 0 1-.209.878c-.08.065-.16.126-.31.223a6.077 6.077 0 0 1-.792.433 6.924 6.924 0 0 1-2.876.62 6.913 6.913 0 0 1-2.876-.62 6.077 6.077 0 0 1-.792-.433 3.483 3.483 0 0 1-.309-.221.762.762 0 0 1-.21-.88L3.93 7.5H2.353a.75.75 0 0 1 0-1.5h4.102c.05 0 .099-.015.141-.043l1.695-1.154c.29-.198.634-.303.985-.303h1.974V2.75a.75.75 0 0 1 1.5 0ZM2.193 15.198a5.414 5.414 0 0 0 2.557.635 5.414 5.414 0 0 0 2.557-.635L4.75 9.368Zm14.51-.024c.082.04.174.083.275.126.53.223 1.305.45 2.272.45a5.847 5.847 0 0 0 2.547-.576L19.25 9.367Z"></path>
                </svg>
              </div>
              <div className={`mt-0.5`}>Privacy Statement</div>
            </a>
          </div>
          <div className={`tracking-wider text-[0.9rem]`}>
            Copyright © 2024{' '}
            <a
              href={'https://koi.miourasaki.net'}
              target={'_blank'}
              className={`hover:text-[#d98b9b] transition-all`}
              rel="noreferrer"
            >
              KoIArchive Developer
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
