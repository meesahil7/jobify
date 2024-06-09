import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Signup from "../components/signup/Signup";
import Login from "../components/login/Login";
import { useSelector } from "react-redux";
import View from "../components/view/View";
import Form from "../components/form/Form";

const MainRoutes = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Navigate to={"/login"} />} />
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/signup"
        element={token ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/company/:id"
        element={!token ? <Navigate to="/" /> : <View />}
      />
      <Route
        path="/company/edit/:id"
        element={!token ? <Navigate to="/" /> : <Form />}
      />
      <Route
        path="/company/add"
        element={!token ? <Navigate to="/" /> : <Form />}
      />
      <Route path="*" element={<h2>404 : Page not found</h2>} />
    </Routes>
  );
};

export default MainRoutes;
