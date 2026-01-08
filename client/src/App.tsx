import { useRoutes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import MangaDetailPage from "./pages/MangaDetailPage";

const App = () => {
  const routes = useRoutes([
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: `manga/:slug`,
      element: <MangaDetailPage />,
    },
  ]);
  return (
    <div>
      <Header />
      {routes}
      <Footer />
    </div>
  );
};

export default App;
