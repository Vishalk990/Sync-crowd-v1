import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip"; 

const people = [
  {
    id: 1,
    name: "Shubham Mishra",
    designation: "Software Engineer",
    image:
      ["https://media.licdn.com/dms/image/D5603AQHaxNVp4dvMRw/profile-displayphoto-shrink_400_400/0/1719207062931?e=1727913600&v=beta&t=otk0qGMTTXFCBUlYcXzoGQLx6eo8qhRCiLF4yM4KWMY"],
  },
  {
    id: 2,
    name: "Suryansh Bachchan Verma",
    designation: "Product Manager",
    image:
    ["https://media.licdn.com/dms/image/D5603AQGBrIEP7dT1fw/profile-displayphoto-shrink_400_400/0/1723103383972?e=1728518400&v=beta&t=yQQX2IgOUzXUCXMnCBaNdI8a7YnMOnQdQDMaSTEetkI"],
  },
  {
    id: 3,
    name: "Vishal kalita",
    designation: "Data Scientist",
    image:
    ["https://media.licdn.com/dms/image/D5603AQEiqdbi42dbNw/profile-displayphoto-shrink_400_400/0/1710172258923?e=1727913600&v=beta&t=RWtKlXg_CIc7svU4wLz3Ek1Xg5l4z50ls5Um45V8leU"] ,
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
