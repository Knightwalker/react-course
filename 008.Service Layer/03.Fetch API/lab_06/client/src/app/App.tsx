import { RouterProvider } from "react-router-dom";
import routerInstance from "./AppRouters";
import "./App.css";

const App = () => {
  return (
    <div className="App">
        <RouterProvider router={routerInstance} />
    </div>
  )
};

export default App;