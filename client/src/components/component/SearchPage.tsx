import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import HeroImage from "../../assets/hero_pizza.png";
import { Skeleton } from "../ui/skeleton";
const SearchPage = () => {
  const { text } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const loading = false;
  return (
    <div className=" max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          {/* search input field */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search by cuisines and restaurant"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <Button className="bg-orange hover:bg-hoverOrange">Search</Button>
          </div>
          {/* searched items */}
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">(2) Search Results found.</h1>
              <div className="flex flex-wrap gap-2 mb-3 md:mb-0">
                {["biryani", "momos", "sandwich"].map(
                  (selectedFilter, index) => {
                    return (
                      <div
                        className="relative inline-flex items-center max-w-full gap-2"
                        key={index}
                      >
                        <Badge
                          className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                          variant="outline"
                        >
                          {selectedFilter}
                        </Badge>
                        <X
                          className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                          size={16}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            {/* restaurantCard */}
            <div className="grid md:grid-cols-3 gap-4">
              {loading ? (
                <SearchPageSkeleton />
              ) : (
                <>
                  {[1, 2, 3].map((_, index) => {
                    return (
                      <Card
                        className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl  transition duration-300"
                        key={index}
                      >
                        <div className="relative">
                          <AspectRatio ratio={16 / 6}>
                            <img
                              src={HeroImage}
                              alt="image"
                              className="w-full h-full object-cover"
                            />
                          </AspectRatio>
                          <div className="absolute top-2 left-2 bg-white bg-opacity-75 rounded-lg py-1 px-3">
                            <span className="text-sm font-medium text-gray-700">
                              Featured
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h1 className="text-2xl font-bold text-gray-900">
                            Pizza studio
                          </h1>
                          <div className="mt-2 gap-1 flex items-center text-gray-600">
                            <MapPin size={16} />
                            <p className="text-sm">
                              City: <span className="font-medium">Mumbai</span>
                            </p>
                          </div>
                          <div className="mt-2 gap-1 flex items-center text-gray-600">
                            <Globe size={16} />
                            <p className="text-sm">
                              Country:{" "}
                              <span className="font-medium">India</span>
                            </p>
                          </div>
                          <div className="flex gap-2 mt-4 flex-wrap">
                            {["biryani", "momos", "sandwich"].map(
                              (cuisine, index) => {
                                return (
                                  <Badge
                                    key={index}
                                    className="font-medium px-2 py-1 rounded-full shadow-sm"
                                  >
                                    {cuisine}
                                  </Badge>
                                );
                              }
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 border-t border-t-gray-100 text-white flex justify-end">
                          <Link to={`/restaurant/${123}`}>
                            <Button className="bg-orange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                              View Mesnus
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const SearchPageSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden"
        >
          <div className="relative">
            <AspectRatio ratio={16 / 6}>
              <Skeleton className="w-full h-full" />
            </AspectRatio>
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-2 flex gap-1 items-center text-gray-600 dark:text-gray-400">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardContent>
          <CardFooter className="p-4  dark:bg-gray-900 flex justify-end">
            <Skeleton className="h-10 w-24 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className="mt-4 bg-orange hover:bg-orangeHover">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};
