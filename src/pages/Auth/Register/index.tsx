import AuthLayout from "../../../components/layouts/AuthLayout";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import styles from "./Register.module.scss";
import { FormEvent, useState } from "react";
import authServices from "../../../service/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const requestBody = {
      email: email,
      username: username,
      password: password,
      nama: fullname,
    };

    try {
      const { data } = await authServices.registerUser(requestBody);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registration successful",
        timer: 3000,
      });
      setIsLoading(false);
      if (data.status) {
        navigate("/auth/login");
      }
    } catch (error: any) {
      const resultFromApi = error.response
        ? error.response.data.message
        : "Failed to register account";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: resultFromApi,
        timer: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Have an account? Sign In"
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Username"
          name="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          onChange={(e) => setFullname(e.target.value)}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          className={styles.register__button}
          isDisabled={isLoading}
        >
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
