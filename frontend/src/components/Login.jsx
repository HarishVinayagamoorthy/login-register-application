import React, { useEffect, useState } from "react";
import { Form, Input, Button, Avatar, message, Spin } from "antd";
import {
  UserOutlined,
  LockOutlined,
  Loading3QuartersOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let response = await axios.post("http://localhost:8080/api/auth/login", {
        name: values?.name,
        password: values?.password,
      });
      const { token } = response?.data;
      localStorage.setItem("token", token);
      message.success("Logged in Successfully");
      setIsAuthenticated(true);
      navigate("/details");
    } catch (error) {
      message.error(
        error?.response?.data?.error || "Invalid Username or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  const nav_signup = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="sign-in-heading">Sign-In</div>
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{ margin: "20px auto", display: "block" }}
        />
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Username is required!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <div className="dont-have-acc-container">
            <div className="account-text">Don't have an account?</div>
            <div className="form-text" onClick={nav_signup}>
              Register now
            </div>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="login-btn"
              loading={loading}
            >
              {loading ? (
                <Spin indicator={<Loading3QuartersOutlined spin />} />
              ) : (
                "Login"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
