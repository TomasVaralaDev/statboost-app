import { RouterProvider } from "react-router-dom";
import { router } from "./router/AppRouter";
import { useTheme } from "./hooks/useTheme"; // Tuodaan hookki

function App() {
  // Kutsutaan hookia tässä, jotta se lukee teeman localStorage-muistista
  // ja asettaa oikean CSS-luokan <html>-tägiin heti kun sovellus latautuu.
  useTheme();

  return <RouterProvider router={router} />;
}

export default App;
