import { RefObject, useRef } from "react";
import { BiCoffee, BsFillChatRightTextFill } from "../assets";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  // use the AuthHook for registration funciton
  const { register, authError } = useAuth();

  const formFields = [
    {
      type: "email",
      placeholder: "Enter your email",
      ref: emailRef,
    },
    {
      type: "text",
      placeholder: "Enter your username",
      ref: usernameRef,
    },
    {
      type: "password",
      placeholder: "Enter your password",
      ref: passwordRef,
    },
  ];

  // handle the user registration
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    await register(user);
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
            Create your account
          </h3>
          <p className="text-text_light_secondary dark:text-text_dark_secondary text-sm">
            Join OChat and start chatting
          </p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="w-full flex dark:bg-backgroundDark2 dark:text-text_dark_primary flex-col items-center p-6 rounded-lg bg-white shadow-md"
        >
          {authError && <p className="text-red-500 text-center mb-4 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">{authError}</p>}
          {formFields.map((field, index) => (
            <input
              key={index}
              type={field.type}
              required
              placeholder={field.placeholder}
              ref={field.ref}
              className="w-full dark:bg-backgroundDark1 dark:text-text_dark_primary mb-3 px-4 py-3 rounded-md border border-border_light dark:border-border_dark focus:outline-none focus:border-primary transition-all text-sm"
            />
          ))}
          <div className="w-full mt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-md hover:bg-primary_hover transition-colors focus:outline-none text-white bg-primary font-medium text-sm uppercase tracking-wide"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-text_light_secondary dark:text-text_dark_secondary text-sm">
            Already have an account?{" "}
            <Link
              className="text-primary cursor-pointer hover:underline font-medium"
              to={"/login"}
            >
              Sign In
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
