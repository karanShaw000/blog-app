import { Link, useNavigate } from "react-router-dom";
import LabelledInput from "./ui/LabelledInput";
import Button from "./ui/Button";
import { FormEvent, useState } from "react";
import { SigninType } from "@karan000/common";
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignInForm = () => {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState<SigninType>({
    email: "",
    password: "",
  });

  const signinSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        formInputs
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      navigate("/");
      location.reload();
    } catch (error) {
      alert(error);
    }
    console.log(formInputs);
    setFormInputs({ email: "", password: "" });
  };

  return (
    <div className="bg-white space-y-6">
      <div className="text-center space-y-3">
        <h1 className=" text-4xl font-semibold">Login with your account</h1>
        <p className="text-2xl">
          Dont have an Account?{" "}
          <Link to={"/signup"} className="underline">
            Sign up
          </Link>
        </p>
      </div>

      <form className="space-y-6 " onSubmit={signinSubmitHandler}>
        <LabelledInput
          onChange={(e) =>
            setFormInputs((old) => {
              return { ...old, email: e.target.value };
            })
          }
          type="email"
          label="Email"
          placeholder="Enter your Email"
        />
        <LabelledInput
          type="password"
          onChange={(e) =>
            setFormInputs((old) => {
              return { ...old, password: e.target.value };
            })
          }
          label="Password"
          placeholder="Enter your Password"
        />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
};

export default SignInForm;
