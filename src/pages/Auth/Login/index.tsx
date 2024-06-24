import AuthLayout from "../../../components/layouts/AuthLayout";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import styles from "./Login.module.scss";
import { FormEvent, useEffect, useState } from "react";
import useUserContext from "../../../hooks/useUserContext";
import authServices from "../../../service/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setUser, setAuthenticated, authenticated } = useUserContext();
  const navigate = useNavigate();

  if (authenticated) navigate("/");

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const authehtication = async () => {
        const { data } = await authServices.refreshToken({
          refreshToken: refreshToken,
        });

        if (data.status) {
          localStorage.setItem("accessToken", data.accessToken);
          navigate("/");
        }
      };
      authehtication();
    }
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { data } = await authServices.loginUser({ email, password });
      if (data.status) {
        setUser(data.data[0]);
        setAuthenticated(true);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        if (data?.data[0].role === "admin") {
          navigate("/admin/dashboard");
        } else if (data?.data[0].role === "member") {
          navigate("/");
        }
      }
    } catch (error: any) {
      const resultFromApi = error.response
        ? error.response.data.message
        : "An error occurred. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: resultFromApi,
      });
      setAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have an account? Sign Up"
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <Button type="submit" className={styles.login__button}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className={styles.login__devider} />
    </AuthLayout>
  );
};
export default LoginPage;
