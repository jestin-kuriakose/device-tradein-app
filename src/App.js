import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import QuoteResult from "./pages/QuoteResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/quote" element={<QuoteResult/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
