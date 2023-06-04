"use client";

import "./styles.css";
import Form from "@/components/Form";
import StringInput from "@/components/StringInput";

export type LoginFormProps = {};

const LoginForm: React.FC<LoginFormProps> = (props) => {
  return (
    <Form
      className="loginForm"
      onValuesChange={(values) => console.log("values", values)}
    >
      <StringInput name="email" type="email" />
      <StringInput name="password" type="password" />
    </Form>
  );
};

export default LoginForm;
