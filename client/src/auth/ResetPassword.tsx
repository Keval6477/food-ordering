import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewpassword] = useState<string>("");
  const loading: boolean = false;

  //   const handleSubmmit = async () => {

  //   };
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex flex-col gap-5 md:p-8 w-fit mx-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your New password</p>
        </div>
        <div className="relative w-fulls">
          <Input
            type="password"
            placeholder="Enter your passord"
            onChange={(e) => setNewpassword(e.target.value)}
            className="pl-10"
            value={newPassword}
          />
          <LockKeyhole className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        <Button className="bg-orange hover:bg-hoverOrange" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Please Wait
            </>
          ) : (
            "Reset"
          )}
        </Button>
        <span className="text-center">
          Back to{" "}
          <Link to={"/login"} className="text-blue-500">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
