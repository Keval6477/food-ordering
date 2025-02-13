import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const loading = false;
  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value == "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
    //movement to next input box
    if (value !== "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-black-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">VerifyEmail</h1>
          <p className="text-sm text-gray-600">
            Enter 6 digit code send to your email
          </p>
        </div>
        <form>
          <div className="flex justify-between">
            {otp.map((letter: string, index: number) => {
              return (
                <Input
                  key={index}
                  ref={(element) => (inputRef.current[index] = element)}
                  type="text"
                  maxLength={1}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  value={letter}
                  className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              );
            })}
          </div>
          <Button className="bg-orange mt-6 w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
