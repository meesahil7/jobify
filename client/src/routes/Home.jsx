import { Button } from "antd";
import Companies from "../components/companies/Companies";
import Jobs from "../components/jobs/Job";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <h1>Welcome</h1>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
      <Companies />
      <Jobs />
    </>
  );
};

export default Home;
