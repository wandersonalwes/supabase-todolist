import { AuthProvider } from "./contexts/auth";
import { Container } from "./pages/container";

export default function App() {
  return (
    <AuthProvider>
      <Container />
    </AuthProvider>
  );
}
