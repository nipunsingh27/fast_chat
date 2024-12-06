"use client";

import Link from "next/link";
import React, { useState } from "react";
import "../globals.css";
import InputField from "../components/InputField";
import Checkbox from "../components/Checkbox";
import { hashPassword } from "../modules/Hashing";
import { setCookie ,getCSRFToken} from "../modules/Cookies";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberme, setRememberme] = useState<boolean>(false);
  const router = useRouter();
  const HandleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    console.log(username);
  };

  const HandlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    console.log(password);
  };
  const HandleRemembermeChange = (newRememberme: boolean) => {
    setRememberme(newRememberme);
    console.log(rememberme);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // try {
      const hashedPassword = await hashPassword(password);

      const formData = {
        username: username,
        password: hashedPassword,
      };

      const response = await fetch('http://127.0.0.1:8000/auth/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken() || '', // Make sure to pass the CSRF token
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log("status", data.status)
      if (data.status === 'success') {
        setCookie("token",data.user.token,7);
        router.push("/chat");

      } else {
        alert(data.message || 'Sign in failed');
      }
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('An error occurred while signing up.');
    // }
  };
  

  return (
    <div className="page-background">
      <div className="form-container">
        <h2 className="title-text">Sign In</h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
          <div className="rounded-md shadow-sm space-y-4">
            <InputField
              onInputChange={HandleUsernameChange}
              placeHolder={"Enter username"}
            />
            <InputField
              onInputChange={HandlePasswordChange}
              placeHolder={"Enter password"}
              type="password"

            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox onChangeState={HandleRemembermeChange} />
              <label
                htmlFor="remember_me"
                className="block ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" className="button">
              Sign In
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <p>
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
