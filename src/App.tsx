import { AuthProvider } from "./contexts/auth";
import { Container } from "./pages/container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AuthProvider>
      <Container />
      <ToastContainer />
    </AuthProvider>
  );
}
