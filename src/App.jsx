import { ToastContainer } from "react-toastify";
import Header from "./components/common/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <AppRoutes />
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
   
    </>
  );
}

export default App;
