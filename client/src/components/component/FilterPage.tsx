import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export interface IFilterOptionsState {
  id: string;
  label: string;
}

const filterOptions: IFilterOptionsState[] = [
  {
    id: "burger",
    label: "Burger",
  },
  {
    id: "thali",
    label: "Thali",
  },
  {
    id: "biryani",
    label: "Biryani",
  },
  {
    id: "momos",
    label: "Momos",
  },
];

const FilterPage = () => {
  const appliedFilterHandle = (value: string) => {
    console.log(value);
  };
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button variant="link">Reset</Button>
      </div>
      {filterOptions?.map((option) => {
        return (
          <div key={option.id} className="flex items-center space-x-2 my-5">
            <Checkbox
              id={option.id}
              onClick={() => appliedFilterHandle(option.label)}
            />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
              {option?.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default FilterPage;
