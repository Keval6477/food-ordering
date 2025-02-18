import {
  Loader2,
  Locate,
  Mail,
  MapPin,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import React, { FormEvent, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

type ProfileDataState = {
  fullname: string;
  email: string;
  address: string;
  city: string;
  country: string;
  profilePicture?: string;
};

const Profile = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const loading = false;
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [profileData, setProfileData] = useState<ProfileDataState>({
    fullname: "",
    email: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfile(result);
        setProfileData((prev) => ({ ...prev, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(profileData);
  };

  return (
    <form className="max-w-7xl my-5" onSubmit={updateProfileHandler}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <AvatarImage src={selectedProfile} />
            <AvatarFallback>CN</AvatarFallback>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={imageRef}
              onChange={fileChangeHandler}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white h-8 w-8" />
            </div>
          </Avatar>
          <Input
            type="text"
            name="fullname"
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
            value={profileData.fullname}
            onChange={inputHandler}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              type="text"
              value={profileData.email}
              onChange={inputHandler}
              name="email"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Locate className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              type="text"
              value={profileData.address}
              onChange={inputHandler}
              name="address"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              type="text"
              value={profileData.city}
              onChange={inputHandler}
              name="city"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPinnedIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              type="text"
              value={profileData.country}
              onChange={inputHandler}
              name="country"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
      </div>
      <div className="text-center">
        <Button type="submit" className="bg-orange" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 animate-spin w-4 h-4" />
              Please wait
            </>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </form>
  );
};

export default Profile;
