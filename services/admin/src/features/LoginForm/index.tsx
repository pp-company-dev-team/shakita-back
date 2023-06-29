"use client";

import "./styles.css";
import Form from "@/components/Form";
import StringInput from "@/components/StringInput";
import { authService } from "@/shared/services/authService";

export type LoginFormProps = {};

const LoginForm: React.FC<LoginFormProps> = (props) => {
  return (
    <Form className="loginForm" onSubmit={(data) => authService.login(data)}>
      <h2>Login</h2>
      <StringInput name="email" type="email" />
      <StringInput name="password" type="password" />
      <button type="submit">login</button>
    </Form>
  );
};

export default LoginForm;
