import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignUpInputState, userSignupSchema } from "@/Schema/userSchema";
import { Contact, Loader2, LockKeyhole, Mail, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

// type SignUpInputState = {
//   fullName: string;
//   email: string;
//   password: string;
//   contact: string;
// };

const Signup = () => {
  const [input, setInput] = useState<SignUpInputState>({
    email: "",
    password: "",
    fullName: "",
    contact: "",
  });
  const [errors, setErrors] = useState<Partial<SignUpInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    //check form validatiov first then api call.
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result?.error?.formErrors?.fieldErrors;
      setErrors(fieldErrors as Partial<SignUpInputState>);
      return;
    }
    //api call for submit data
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
              type="text"
              id="fullName"
              placeholder="Enter your Fullname"
              className="pl-10 focus-visible:ring-1"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-sm text-red-500">{errors?.fullName}</span>
            )}
          </div>
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
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              id="Contact Number"
              placeholder="Enter your Contact Number"
              className="pl-10 focus-visible:ring-1"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
            />
            <Contact className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-sm text-red-500">{errors?.contact}</span>
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
              "Signup"
            )}
          </Button>
        </div>
        <Separator />
        <p className="mt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
