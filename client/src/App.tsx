import { useRoutes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";

const App = () => {
  const routes = useRoutes([
    {
      index: true,
      element: <HomePage />,
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
