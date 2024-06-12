import {Route, Routes} from "react-router-dom";
import Index from "./pages/Index";
import MainHeader from "./components/MainHeader";

function App(): JSX.Element {

  return (<>
    <Routes>
      <Route path={"/app/*"} element={<MainHeader />} />
      <Route path={"/*"} element={<Index />} />
    </Routes>
  </>)
}

export default App
