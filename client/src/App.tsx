import { useLocation, useRoutes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import MangaDetailPage from "./pages/MangaDetailPage";
import MangaChapterPage from "./pages/MangaChapterPage";
import { useEffect } from "react";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import MangaPage from "./pages/MangaPage";
import MovieDetailPage from "./pages/MovieDetailPage";

const App = () => {
  const routes = useRoutes([
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: `search`,
      element: <SearchPage />,
    },
    {
      path: `movie`,
      element: <MangaPage />,
    },
    {
      path: `movie/:slug`,
      element: <MovieDetailPage />,
    },
    {
      path: `manga`,
      element: <MangaPage />,
    },
    {
      path: `manga/:slug`,
      element: <MangaDetailPage />,
    },
    {
      path: `manga/:slug/chapter/:id`,
      element: <MangaChapterPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div>
      <Header />
      <main>{routes}</main>
      <Footer />
    </div>
  );
};

export default App;
