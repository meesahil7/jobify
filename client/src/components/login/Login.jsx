import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin, message } from "antd";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(
      login({
        values,
        messageApi,
      })
    );
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Spin spinning={authState.isLoading} fullscreen></Spin>
      <div className={styles.form}>
        <h2>Login</h2>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={{ display: "flex", gap: "30px" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <span> Or</span>{" "}
            <Button type="link" onClick={() => navigate("/signup")}>
              Register now
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
