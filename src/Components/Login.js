import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined, UserOutlined
} from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/dataActions";
const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { loading, loginSuccess, loginFailed } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      navigate("/home");
    } else if (loginFailed) {
      setError(loginFailed);
    }
  }, [loginSuccess, loginFailed]);

  const onFormSubmit = (v) => {
    console.log(v);
    dispatch(login(v.username, v.password));
  };

  return (
    <div className="page-content">
      <div className="row h-100">
        <div className="col-sm-12">
          <div className="d-flex flex-column align-items-center justify-content-center h-100 ">
            <h2 className="tail-head">tailwebs.</h2>
            <Card className="login-card">
              <Form layout={"vertical"} form={form} onFinish={onFormSubmit}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter user name"
                    prefix={<UserOutlined />}
                    status={userNameError ? "error" : ""}
                    value={userName}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password
                    status={passwordError ? "error" : ""}
                    className="mt-2"
                    placeholder="input password"
                    value={password}
                    prefix={<LockOutlined />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <p className="text-danger">{error}</p>
                <div className="text-end">
                  <a href="">Forgot password</a>
                </div>
                <Form.Item className="text-center">
                  <Button htmlType="submit" className="login-btn" size="large">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
