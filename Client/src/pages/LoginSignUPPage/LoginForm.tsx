import { useState } from "react";

import type { ChangeEvent, FormEvent } from "react";

import { loginApi } from "./auth.services";

import { NavLink, useNavigate } from "react-router-dom";

import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { FaLock } from "react-icons/fa";

interface LoginForm {

  email: string;

  password: string;
}

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>(

    {

      email: "",

      password: ""

    }

  );

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    setForm(

      {

        ...form, [e.target.name]: e.target.value

      }

    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!emailRegex.test(form.email)) {

      alert("Please enter a valid email address.");

      return;

    }

    if (!passwordRegex.test(form.password)) {

      alert("Password must be at least 6 characters, include uppercase, lowercase and a number.");

      return;

    }

    try {

      const res = await loginApi(form);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err: unknown) {

      if (err && typeof err === "object" && "response" in err) {

        const apiError = err as { response?: { data?: { message?: string } } };

        alert(apiError.response?.data?.message || "Login failed");

      } else {

        alert("Login failed");

      }
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 font-[Jost] text-[17px] sm:text-[18px] lg:text-[19px] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">

      {/* Logo and Branding */}

      <div className="flex flex-col items-center mb-8">

        <img src="/logo.png" alt="AI Interview Hub Logo" className="h-12 mb-2" />

        <h1 className="text-3xl font-bold text-gray-800 text-center">AI Interview Hub</h1>

        <p className="text-md text-gray-500 mt-2 text-center">Smart interviewing for modern HR Teams</p>

      </div>

      {/* Card */}

      <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg">

        {/* Welcome Text Inside Card */}

        <div className="text-center mb-6">

          <h2 className="text-2xl font-semibold text-gray-800">Welcome</h2>

          <p className="text-base text-gray-900">Sign in or create a new account to get started.</p>

        </div>

        {/* Tabs */}

        <div className="flex justify-center mb-6 space-x-2">

          <span className="px-4 py-2 rounded-full bg-black text-white font-semibold tracking-wide text-sm sm:text-base">

            Login

          </span>

          <NavLink

            to="/signup"

            className="px-4 py-2 rounded-full border border-black text-black font-semibold hover:bg-gray-200 transition tracking-wide text-sm sm:text-base"

          >

            Sign Up

          </NavLink>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}

          <div className="relative">

            <input

              name="email"

              type="email"

              placeholder="Email"

              value={form.email}

              onChange={handleChange}

              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"

            />

            <AiOutlineMail

              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"

              size={20}

            />

          </div>

          {/* Password */}

          <div className="relative">

            <FaLock

              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"

              size={18}

            />

            <input

              name="password"

              type={showPassword ? "text" : "password"}

              placeholder="Password"

              value={form.password}

              onChange={handleChange}

              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"

            />

            <div

              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"

              onClick={() => setShowPassword(!showPassword)}

            >

              {
                showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />
              }

            </div>

          </div>

          <button

            type="submit"

            className="w-full bg-black text-white py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform text-sm sm:text-base"

          >

            Sign In

          </button>

        </form>

      </div>

    </div>

  );
}