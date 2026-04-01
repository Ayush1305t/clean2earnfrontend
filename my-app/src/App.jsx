import CleaningValidationPage from "./pages/CleaningValidationPage";
import CleaningFlow from "./pages/CleaningFlow";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clean" element={<CleaningFlow />} />
        <Route path="/validation" element={<CleaningValidationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;