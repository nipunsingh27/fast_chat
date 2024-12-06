"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import "../globals.css";
import InputField from "../components/InputField";
import { hashPassword } from "../modules/Hashing";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Invalid email format");
      return;
    }

    if (confirmPassword !== password) {
      alert("Passwords do not match!");
      return;
    }

    // try {
    const hashedPassword = await hashPassword(password);

    const formData = {
      username: username,
      email: email,
      password: hashedPassword,
      name: name,
    };

    const response = await fetch("http://127.0.0.1:8000/auth/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken() || "", // Make sure to pass the CSRF token
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.status === "success") {
      alert("Sign up successful!\n please sign in");
      router.push("/signin");
    } else {
      alert(data.message || "Sign up failed");
    }
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('An error occurred while signing up.');
    // }
  };

  const getCSRFToken = () => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, 10) === "csrftoken=") {
          cookieValue = decodeURIComponent(cookie.substring(10));
          break;
        }
      }
    }
    return cookieValue;
  };

  const HandleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };

  const HandleNameChange = (newName: string) => {
    setName(newName);
  };

  const HandleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const HandlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const HandleConfirmPasswordChange = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);
  };

  return (
    <div className="page-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Sign Up
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <InputField
              onInputChange={HandleEmailChange}
              placeHolder="Enter email"
            />
            <InputField
              onInputChange={HandleNameChange}
              placeHolder="Enter name"
            />
            <InputField
              onInputChange={HandleUsernameChange}
              placeHolder="Enter username"
            />
            <InputField
              onInputChange={HandlePasswordChange}
              placeHolder="Enter password"
              type="password"
            />
            <InputField
              onInputChange={HandleConfirmPasswordChange}
              placeHolder="Confirm password"
              type="password"
            />
          </div>

          <div>
            <button type="submit" className="button">
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <p>
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
