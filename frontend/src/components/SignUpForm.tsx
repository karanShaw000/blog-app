import { Link, useNavigate } from "react-router-dom";
import LabelledInput from "./ui/LabelledInput";
import Button from "./ui/Button";
import { SignupType } from "@karan000/common";
import { FormEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const signupSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
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
    //setFormInputs({ name: "", email: "", password: "" });
  };
  return (
    <div className="bg-white space-y-6">
      <div className="text-center space-y-3">
        <h1 className=" text-4xl font-semibold">Create Your account</h1>
        <p className="text-2xl">
          You have an existing account?{" "}
          <Link to={"/signin"} className="underline">
            Sign In
          </Link>
        </p>
      </div>

      <form className="space-y-6 " onSubmit={signupSubmitHandler}>
        <LabelledInput
          type="text"
          onChange={(e) =>
            setFormInputs((old) => {
              return { ...old, name: e.target.value };
            })
          }
          label="Username"
          placeholder="Enter your Username"
        />

        <LabelledInput
          type="email"
          onChange={(e) =>
            setFormInputs((old) => {
              return { ...old, email: e.target.value };
            })
          }
          label="Email"
          placeholder="Enter your Email"
        />
        <LabelledInput
          type="password"
          label="Password"
          onChange={(e) =>
            setFormInputs((old) => {
              return { ...old, password: e.target.value };
            })
          }
          placeholder="Enter your Password"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
