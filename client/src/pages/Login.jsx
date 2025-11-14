import { RefObject, useRef } from "react";
import { BiCoffee, BsFillChatRightTextFill } from "../assets";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const userIdRef = useRef();
  const passwordRef = useRef();

  const { login, authError } = useAuth();

  const formFields = [
    {
      type: "userId",
      placeholder: "Enter your email or username",
      ref: userIdRef,
    },

    {
      type: "password",
      placeholder: "Enter your password",
      ref: passwordRef,
    },
  ];

  // handle user login
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = {
      userId: userIdRef.current.value,
      password: passwordRef.current.value,
    };

    // login hook
    await login(user);
  };

  return (
    <div className="login w-full h-screen bg-backgroundLight2 dark:bg-backgroundDark3 flex items-center justify-center">
      <div className="l-wrapper w-[400px] md:w-[90%] flex items-center flex-col gap-6 p-4">
        {/* WhatsApp Style Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-primary rounded-full p-4 shadow-lg">
            <BsFillChatRightTextFill className="text-white text-4xl" />
          </div>
          <h1 className="text-2xl font-medium text-text_light_primary dark:text-text_dark_primary">
            OCHAT
          </h1>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h3 className="font-normal text-xl text-text_light_primary dark:text-text_dark_primary">
            Sign in to your account
          </h3>
          <p className="text-text_light_secondary dark:text-text_dark_secondary text-sm">
            Continue your conversations
          </p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="w-full dark:bg-backgroundDark2 flex flex-col items-center p-6 rounded-lg bg-white shadow-md"
        >
          {authError && <p className="text-red-500 text-center mb-4 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">{authError}</p>}
          {formFields.map((field, index) => (
            <input
              key={index}
              type={field.type}
              required
              placeholder={field.placeholder}
              ref={field.ref}
              className="dark:bg-backgroundDark1 dark:text-text_dark_primary w-full mb-3 px-4 py-3 rounded-md border border-border_light dark:border-border_dark focus:outline-none focus:border-primary transition-all text-sm"
            />
          ))}
          <div className="w-full mt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-md hover:bg-primary_hover transition-colors focus:outline-none text-white bg-primary font-medium text-sm uppercase tracking-wide"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-text_light_secondary dark:text-text_dark_secondary text-sm">
            Don't have an account?{" "}
            <Link
              className="text-primary cursor-pointer hover:underline font-medium"
              to={"/register"}
            >
              Sign Up
            </Link>
          </p>
          <p className="text-text_light_secondary dark:text-text_dark_secondary text-xs mt-6 opacity-70">
            Crafted with ☕ by Swapnil Negi
          </p>
        </div>
      </div>
    </div>
  );
}
