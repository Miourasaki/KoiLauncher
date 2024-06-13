// @ts-ignore
const version = __APP_VERSION__

function About(): JSX.Element {


  return (
    <main className={`w-full h-full relative drag`}>
      <div
        className={`w-full h-full flex-grow flex px-8 py-6 text-white flex-col`}
        style={{ background: '#212121' }}
      >
        <div className={`w-full flex justify-between items-center`}>
          <a
            href={'https://koil.mio.am'}
            target={'_blank'}
            className={`flex items-center gap-3.5`}
            rel="noreferrer"
          >
            <img
              className={`w-9`}
              src="data:image/png;base64,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"
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
          <div className={`text-stone-300 text-sm flex flex-col gap-1`}>
            <button
              onClick={() => window.electron.ipcRenderer.send('window:openLicense')}
              className={`flex items-center hover:text-white transition-all`}
            >
              <div className={`w-[1.2rem] mr-3 text-white`}>
                <svg className={'w-full'} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.75 2.75V4.5h1.975c.351 0 .694.106.984.303l1.697 1.154c.041.028.09.043.14.043h4.102a.75.75 0 0 1 0 1.5H20.07l3.366 7.68a.749.749 0 0 1-.23.896c-.1.074-.203.143-.31.206a6.296 6.296 0 0 1-.79.399 7.349 7.349 0 0 1-2.856.569 7.343 7.343 0 0 1-2.855-.568 6.205 6.205 0 0 1-.79-.4 3.205 3.205 0 0 1-.307-.202l-.005-.004a.749.749 0 0 1-.23-.896l3.368-7.68h-.886c-.351 0-.694-.106-.984-.303l-1.697-1.154a.246.246 0 0 0-.14-.043H12.75v14.5h4.487a.75.75 0 0 1 0 1.5H6.763a.75.75 0 0 1 0-1.5h4.487V6H9.275a.249.249 0 0 0-.14.043L7.439 7.197c-.29.197-.633.303-.984.303h-.886l3.368 7.68a.75.75 0 0 1-.209.878c-.08.065-.16.126-.31.223a6.077 6.077 0 0 1-.792.433 6.924 6.924 0 0 1-2.876.62 6.913 6.913 0 0 1-2.876-.62 6.077 6.077 0 0 1-.792-.433 3.483 3.483 0 0 1-.309-.221.762.762 0 0 1-.21-.88L3.93 7.5H2.353a.75.75 0 0 1 0-1.5h4.102c.05 0 .099-.015.141-.043l1.695-1.154c.29-.198.634-.303.985-.303h1.974V2.75a.75.75 0 0 1 1.5 0ZM2.193 15.198a5.414 5.414 0 0 0 2.557.635 5.414 5.414 0 0 0 2.557-.635L4.75 9.368Zm14.51-.024c.082.04.174.083.275.126.53.223 1.305.45 2.272.45a5.847 5.847 0 0 0 2.547-.576L19.25 9.367Z"></path>
                </svg>
              </div>
              <div>Apache License 2.0</div>
            </button>
            <a
              href={'https://policy.miourasaki.net/koilauncher/service'}
              target={'_blank'}
              className={`flex items-center hover:text-white transition-all`}
              rel="noreferrer"
            >
              <div className={`w-[1.1rem] mr-[0.8rem] ml-[0.05rem] text-white`}>
                <svg className={'w-full'} viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"></path>
                </svg>
              </div>
              <div>Terms of Service</div>
            </a>
            <a
              href={'https://policy.miourasaki.net/koilauncher/privacy'}
              target={'_blank'}
              className={`flex items-center hover:text-white transition-all`}
              rel="noreferrer"
            >
              <div className={`w-[1.2rem] mr-3 text-white`}>
                <svg className={'w-full'} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.75 2.75V4.5h1.975c.351 0 .694.106.984.303l1.697 1.154c.041.028.09.043.14.043h4.102a.75.75 0 0 1 0 1.5H20.07l3.366 7.68a.749.749 0 0 1-.23.896c-.1.074-.203.143-.31.206a6.296 6.296 0 0 1-.79.399 7.349 7.349 0 0 1-2.856.569 7.343 7.343 0 0 1-2.855-.568 6.205 6.205 0 0 1-.79-.4 3.205 3.205 0 0 1-.307-.202l-.005-.004a.749.749 0 0 1-.23-.896l3.368-7.68h-.886c-.351 0-.694-.106-.984-.303l-1.697-1.154a.246.246 0 0 0-.14-.043H12.75v14.5h4.487a.75.75 0 0 1 0 1.5H6.763a.75.75 0 0 1 0-1.5h4.487V6H9.275a.249.249 0 0 0-.14.043L7.439 7.197c-.29.197-.633.303-.984.303h-.886l3.368 7.68a.75.75 0 0 1-.209.878c-.08.065-.16.126-.31.223a6.077 6.077 0 0 1-.792.433 6.924 6.924 0 0 1-2.876.62 6.913 6.913 0 0 1-2.876-.62 6.077 6.077 0 0 1-.792-.433 3.483 3.483 0 0 1-.309-.221.762.762 0 0 1-.21-.88L3.93 7.5H2.353a.75.75 0 0 1 0-1.5h4.102c.05 0 .099-.015.141-.043l1.695-1.154c.29-.198.634-.303.985-.303h1.974V2.75a.75.75 0 0 1 1.5 0ZM2.193 15.198a5.414 5.414 0 0 0 2.557.635 5.414 5.414 0 0 0 2.557-.635L4.75 9.368Zm14.51-.024c.082.04.174.083.275.126.53.223 1.305.45 2.272.45a5.847 5.847 0 0 0 2.547-.576L19.25 9.367Z"></path>
                </svg>
              </div>
              <div>Privacy Statement</div>
            </a>
          </div>
          <div className={`tracking-wider`}>
            Copyright © 2023{' '}
            <a href={'https://mio.am'} className={`hover:text-red-500 transition-all`}>
              Miourasaki.NET
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
