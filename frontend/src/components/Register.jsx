import React, { useEffect, useState } from "react";
import { Form, Input, Button, Avatar, DatePicker, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  Loading3QuartersOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Spin } from "antd";
import moment from "moment";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const foramteddob = moment(values?.dob).format("YYYY-MM-DD");

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name: values?.name,
          dob: foramteddob,
          email: values?.email,
          password: values?.password,
        }
      );
      message.success(response.data.message);
      setRegistrationSuccess(true);
    } catch (error) {
      message.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const nav_login = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (registrationSuccess) {
      nav_login();
    }
  }, [registrationSuccess]);
  return (
    <>
      <div className="signup-container">
        <div className="signup-form-container">
          <div className="signup-up-heading">Sign-up</div>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ margin: "20px auto", display: "block" }}
          />
          <Form
            name="signup"
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
              name="dob"
              rules={[{ required: true, message: "D.O.B is required!" }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="Select date of birth"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email is required!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                type="email"
                prefix={<MdOutlineAlternateEmail />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Password is required!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <div className="already-have-acc-container">
              <div className="account-text">Already have an account?</div>
              <div className="form-text" onClick={nav_login}>
                Login now
              </div>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="signup-btn"
                loading={loading}
              >
                {loading ? (
                  <Spin indicator={<Loading3QuartersOutlined spin />} />
                ) : (
                  "Signup"
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
