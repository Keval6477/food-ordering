import { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import HeroImage from "../../assets/hero_pizza.png";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
  return (
    <div className="flex flex-col md:flex-row  max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5 ">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Order food anytime and anywhere
          </h1>
          <p className="text-gray-500 ">
            {" "}
            Hey! our delicious food is waiting for you.
          </p>
        </div>
        <div className="relative">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 shadow-lg"
              placeholder="search here..."
            />
            <Search className="absolute inset-y-2 text-gray-500 left-2" />
            <Button
              className="bg-orange"
              onClick={() => navigate(`/search/${searchText}`)}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      <div>
        <img
          src={HeroImage}
          alt="hero-image"
          className="object-cover w-full max-h-[500px]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
