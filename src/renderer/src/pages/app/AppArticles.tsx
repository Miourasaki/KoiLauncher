import { FlexAppHeader } from "./comp/AppHeader";
import AppRoute from './comp/AppRoute'

const AppArticles = () => {
  const headerList = [
    {
      text: '新闻',
      to: 'news'
    },
    {
      text: '更新日志',
      to: 'update-log'
    },
    {
      text: 'F&Q',
      to: 'faq'
    }
  ]

  return (
    <>
      <FlexAppHeader title={`文章`} list={headerList}>
        <AppRoute path={'news'}>news</AppRoute>
        <AppRoute path={'update-log'}>update-log</AppRoute>
        <AppRoute path={'faq'}>faq=</AppRoute>
      </FlexAppHeader>
    </>
  )
}

export default AppArticles
