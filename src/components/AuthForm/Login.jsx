import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { login, loading, error } = useLogin();

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        size={"sm"}
        value={Input.email}
        onChange={(e) => {
          setInputs({ ...inputs, email: e.target.value });
        }}
      />
      <Input
        placeholder="Password"
        fontSize={14}
        type="password"
        size={"sm"}
        value={Input.password}
        onChange={(e) => {
          setInputs({ ...inputs, password: e.target.value });
        }}
      />
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        type="submit"
        isLoading={loading}
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        onClick={() => login(inputs)}
      >
        Log in
      </Button>
    </>
  );
};

export default Login;
