import {Route, Routes} from "react-router-dom";
import Index from "./pages/Index";
import MainHeader from "./components/MainHeader";

function App(): JSX.Element {

  return (<>
    <MainHeader />
    <Routes>
      <Route index element={<Index />} />
    </Routes>
  </>)
}

export default App
