// type Props = {};

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/Schema/userSchema";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

//typescript ma type define we can using two ways 1.interface 2.type alias

const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if (!result?.success) {
      const fieldErrors = result?.error?.formErrors?.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    console.log(input);
  };

  const loading = false;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="md: p-8 w-full max-w-md md:border border-gray-200 rounded-lg mx-4"
        onSubmit={loginSubmitHandler}
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">Eats.com</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="pl-10 focus-visible:ring-1"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-sm text-red-500">{errors?.email}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              id="password"
              className="pl-10 focus-visible:ring-1 text-gray-500"
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
            <LockKeyhole className="absolute left-2 text-gray-500 pointer-events-none inset-y-2" />
            {errors && (
              <span className="text-sm text-red-500">{errors?.password}</span>
            )}
          </div>
        </div>

        <div className="mb-5">
          <Button
            className="bg-orange hover:bg-hoverOrange w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Login"
            )}
          </Button>
        </div>
        <Separator />
        <p className="mt-2">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-500">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
