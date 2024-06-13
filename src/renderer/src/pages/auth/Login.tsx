import './Login.css'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import { useState } from 'react'

const Login = () => {
  const push = useNavigate()

  const [login, setLogin] = useState(false)

  document.addEventListener('keydown', (e) => {
    if (login) e.preventDefault()
  })

  const loginMs = (): void => {
    setLogin(true)
    window.electron.ipcRenderer.send('oauth:ms-in')
    window.electron.ipcRenderer.removeAllListeners('oauth:ms-out')

    window.electron.ipcRenderer.on('oauth:ms-out', (_event, msg) => {
      const args = msg.split(':')
      if (args[0] == 'error') {
        alert(`error occurred: ${args[1]}`)
        setLogin(false)
      } else if (args[0] == 'token') {
        alert(args[1])
        setLogin(false)
      }
    })
  }

  return (
    <>
      <div
        className={`px-20 items-center justify-center gap-9
      flex flex-col text-white`}
      >
        <div className={`font-medium text-2xl tracking-[0.2rem] uppercase`}>登录 | Login</div>
        <div className={`flex flex-col gap-3.5 w-full`}>
          <button
            onClick={loginMs}
            className={`btn w-full h-10 btn-outline-green green tracking-wide flex px-20 items-center justify-between`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-microsoft"
              viewBox="0 0 16 16"
            >
              <path d="M7.462 0H0v7.19h7.462zM16 0H8.538v7.19H16zM7.462 8.211H0V16h7.462zm8.538 0H8.538V16H16z" />
            </svg>
            <div>使用Microsoft登录</div>
          </button>
          <button
            className={`btn-g relative w-full h-10 btn-outline-green green tracking-wide flex px-20 items-center justify-between`}
          >
            <svg
              width="30"
              height="30"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1143.6 1000"
              fill="currentColor"
              className={`-translate-x-[0.45rem]`}
              xmlSpace="preserve"
            >
              <path
                d="M532.9,373.1c0,0-84.1-19.3-81.8-19.3c0.3,0-39.1,29-39.1,29l40.1,29.1l77.4-7.6l-104.4,60
	c0,0-34.8-26.4-49.6-37c-16.8-12.1-61.4-43.6-61.4-43.6l92-78.8c0,0,126.9,68.2,126.9,68.4V373.1z M635,414.8L635,414.8L635,414.8z
	 M611,449.1l-3.1,155.1H601c-0.2-2.2,2.5-169.3,1.5-169.9l-19.9,22.2c0.2,75.9-0.6,318-0.5,325.2l-7.8,0.3c0,0-0.6-279.7-0.6-325.3
	l-19.3-21c0,0,0.3,116.1-0.6,169.1v-0.1h-5.9L543,449.2l-47.8,124c1,32.1,9.1,228.4,9.1,228.4l19.6,57.7
	c0.5-3.2-2.8-173.8-2.5-190.6h3.6c0.6,28.8,1.7,192.1,4.5,200.3c7.6,22.5,53.7,131,53.7,131s32.6-84.1,43.5-115.5
	c2.8-7.9,6.1-15.7,7.1-24.3c0,0-1-145.2-0.5-191.4h3.1c0,17.8,3.2,189.6,3.2,189.6l14-56.8c0.5-71.8,2-224.4,1.8-228.2L611,449.1z"
              />
              <path
                d="M943.4,582.9l1.6-1.2c0.5,1.8-1,0.8-1.6,1.1V582.9z M491.7,166.6l82.2-107.8l-20.2-27.1
	c-1.2,0-80.3,107.5-80.3,107.5L491.7,166.6z M662.6,166.6L581.3,58.2c0-0.3,19.2-27.3,19.2-27.3l78,106.2L662.6,166.6z M452.8,406.7
	l-34.1-23.9c0-1.3,32.4-23.8,33.1-23.9c2.4-0.3,71.1,14.9,71.6,16l-17.8,26.4L452.8,406.7z M615.4,298.7c7.6,20.7,19.7,36,37.2,44.6
	c0,0-41.6,26-41,24.8c2.3-4.5-13-24.4-19.3-23.5C592.3,344.8,615.4,298.7,615.4,298.7L615.4,298.7z M564.4,344.3
	c-9.3,4.2-19.2,14.3-20.4,23.7c-0.2,1.6-39.3-25.5-39.3-25.5c20.9-7.5,31.8-22,34.3-42.4C539.1,300,564.6,344.1,564.4,344.3z
	 M635,414.8L635,414.8L635,414.8z"
              />
              <path
                d="M943.4,582.8l1.6-1.2C945.6,583.6,944.1,582.5,943.4,582.8z M418.2,467.6L378.4,487l-94.1-76.5l24.7-21.9
	L418.2,467.6L418.2,467.6z M577.4,54.7l-21.1-25.4l21-29.4l21.2,28.1L577.4,54.7L577.4,54.7z M493.7,169.8
	c32.4,69.8,64.3,136.6,84.4,175.8c26-55.5,52-109.8,82.9-175.2c0,0-80.8-107.8-82.5-107.7C576.9,62.8,493.7,169.8,493.7,169.8
	L493.7,169.8z"
              />
              <path d="M604.1,373.5c6.3-25.2-44.1-35.8-52.2-6.9C545.6,389.3,597.4,400,604.1,373.5z" />
              <path
                d="M619,371.3c0,0-9.7,10.5-11.1,11.8c-13.6,12.7-28.7,17.6-46.4,8.7c-2.4-1.2-26.2-16.7-26.2-16.7l-9.3,15.8
	l52,53.1l49.3-52.9L619,371.3z M291.3,375.1l-6.9-5.2l-0.1,0.1L291.3,375.1L291.3,375.1z M256.4,388.9l24.6,18.3
	c0,0,23.4-19.9,24.6-21.1l-14.4-11l-7-5.1l-3.2-2.4L256.4,388.9z M375.8,286.8c-14.3,12.3-61.6,52.2-88.8,75.7l3.3,2.5l20.4,15.1
	l90.7-78.6L375.8,286.8z M627.3,370.7c0,0,84.1-19.3,81.7-19.3c-0.2,0,39.1,29.1,39.1,29.1l-40.1,29.1l-77.4-7.6l104.4,60
	c0,0,34.7-26.4,49.6-37.1c16.8-12.1,61.4-43.6,61.4-43.6l-92-78.8C754.2,302.5,627.3,370.7,627.3,370.7L627.3,370.7z"
              />
              <path
                d="M707.4,404.3l34.1-23.8c0-1.3-32.4-23.8-33.1-23.9c-2.4-0.3-71.1,14.9-71.6,15.9l17.8,26.4L707.4,404.3z
	 M742,465.2l39.8,19.4l94.1-76.5l-24.7-21.9L742,465.2L742,465.2z M903.8,386.6l-24.6,18.3c0,0-23.4-19.9-24.6-21.1l14.4-11l7-5.1
	l3.2-2.4L903.8,386.6z M784.3,284.4c14.3,12.3,61.6,52.2,88.8,75.7l-3.3,2.5l-20.4,15.2l-90.7-78.6L784.3,284.4z"
              />
            </svg>
            <div>使用UIM系统登录</div>
            <span
              className={`absolute w-full h-full top-0 left-0 bg-stone-800 bg-opacity-75 flex justify-center items-center`}
            >
              构建中...
            </span>
          </button>
        </div>
        <button
          onClick={() => {
            localStorage.setItem('tokenType', 'offline')
            push('/')
          }}
          className={`btn w-full h-10`}
        >
          使用 <span className={`text-stone-400`}>离线账号</span> 或{' '}
          <span className={`text-stone-400`}>更多设置</span>
        </button>
      </div>

      {login && (
        <span
          className={`w-full h-full absolute top-0 left-0 bg-stone-800 bg-opacity-75
        flex justify-center items-center`}
        >
          <Loading border={false} text={`...`} />
        </span>
      )}
    </>
  )
}

export default Login
