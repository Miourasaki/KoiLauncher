import MainHeader from "../components/MainHeader";

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (<>
    <MainHeader />
    <div className={`w-full flex-grow`}>
      <div className={`w-full h-full flex`}>
        a
      </div>
    </div>
  </>)
}

export default App
