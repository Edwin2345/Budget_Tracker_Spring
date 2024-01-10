import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
 
function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="h4"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <a href="/" className="flex items-center hover:text-blue-500 transition-colors">
         Dashboard
        </a>
      </Typography>
      <Typography
        as="li"
        variant="h4"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <a href="/add" className="flex items-center hover:text-blue-500 transition-colors">
         Add Expense
        </a>
      </Typography>
      <Typography
        as="li"
        variant="h4"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <a href="/table" className="flex items-center hover:text-blue-500 transition-colors">
          Table View
        </a>
      </Typography>
    </ul>
  );
}
 
export default function MainNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar className="w-full max-w-screen-4xl rounded-none px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h2"
          className="mr-4 cursor-pointer py-1.5"
        >
          Budget Tracker
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
