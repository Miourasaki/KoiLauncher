const AppIndexPage = () => {
  const backWidth = window.localStorage.getItem('backWidth')
  const backHeight = window.localStorage.getItem('backHeight')
  window.electron.ipcRenderer.send('setSize', [
    Number.parseFloat(backWidth ? backWidth : '900'),
    Number.parseFloat(backHeight ? backHeight : '600')
  ])

  window.electron.ipcRenderer.send('openResizable')

  return <div className={`drag`}>a</div>
}

export default AppIndexPage
