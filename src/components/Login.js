import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { saveAuthData } from "../app/slices/authSlice";
const LoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (data, formikHelpers) => {
    console.log(data);
    axios({
      method: "POST",
      url: "http://0.0.0.0:8000/users/api/login/",
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
        dispatch(saveAuthData(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Your username is required!"),
        password: Yup.string()
          .required("Password is required!")
          .min(8, "Must be at least 8 characters"),
      })}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        isSubmitting,
      }) => (
        <form className="login-form" onSubmit={handleSubmit}>
          <Form.Item
            name="username"
            value={values.username}
            help={touched.username && errors.username}
            onChange={handleChange}
            onBlur={handleBlur}
            validateStatus={
              touched.username && errors.username ? "error" : "success"
            }
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            help={touched.password && errors.password}
            validateStatus={
              touched.password && errors.password ? "error" : "success"
            }
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
