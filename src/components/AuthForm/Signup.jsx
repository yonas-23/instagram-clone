import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  return (
    <>
      <Input
        placeholder="Email"
        size={"sm"}
        fontSize={14}
        type="email"
        value={inputs.email}
        onChange={(e) => {
          setInputs({ ...inputs, email: e.target.value });
        }}
      />
      <Input
        placeholder="Username"
        size={"sm"}
        fontSize={14}
        type="text"
        value={inputs.username}
        onChange={(e) => {
          setInputs({ ...inputs, username: e.target.value });
        }}
      />
      <Input
        placeholder="Full Name"
        size={"sm"}
        fontSize={14}
        type="text"
        value={inputs.fullName}
        onChange={(e) => {
          setInputs({ ...inputs, fullName: e.target.value });
        }}
      />

      <InputGroup>
        <Input
          placeholder="Password"
          size={"sm"}
          fontSize={14}
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          onChange={(e) => {
            setInputs({ ...inputs, password: e.target.value });
          }}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              setShowPassword((prevState) => !prevState);
            }}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error && (
        <Alert status="error" fontSize={13} p={3} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        type="submit"
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        isLoading={loading}
        onClick={() => signup(inputs)}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
