import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faPowerOff,
  faUser,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Header() {
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState({});

  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingUser");

    toast.info("You are logging out \n Redirecting to home page"); // Show toast immediately
    setTimeout(() => {
      navigate("/");
    }, 1500); //  delay to let the toast show
    setToken("");
  };
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
      setUserDetails(JSON.parse(sessionStorage.getItem("existingUser")));
    }
  }, []);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 p-3 bg-[#FFD6BA]">
        <div className="flex items-center">
          <Link to={"/"}>
            <img
              src="/images/logo-light.png"
              alt="logo"
              style={{ height: "80px", width: "80px" }}
            />
          </Link>
        </div>

        <div className="hidden md:flex justify-center items-center">
          <h1 className="text-3xl font-bold text-green-800">LEAFLINE</h1>
        </div>

        <Menu as="div" className="relative inline-block text-end mt-5">
          <div>
            <MenuButton className="inline-flex w-full justify-end gap-x-2 rounded-md  px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5">
              {token ? (
                <p className="text-green-800 text-lg">
                  Hi,{" "}
                  {userDetails.username.charAt(0).toUpperCase() +
                    userDetails.username.slice(1).toLowerCase()}{" "}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-7 text-gray-400 inline hover:text-gray-500"
                  />
                </p>
              ) : (
             
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    beat
                    className="fa-2x ms-3 text-green-800"
                  />
        
              )}
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                {token ? (
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    onClick={logOut}
                  >
                    <FontAwesomeIcon
                      icon={faPowerOff}
                      className="me-3 text-lg"
                    />
                    Logout
                  </button>
                ) : (
                  <Link to={"/login"}>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      // onClick={logOut}
                    >
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Login
                    </button>
                  </Link>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>

        <ToastContainer
          position="top-center"
          theme="colored"
          autoClose="2000"
        />
      </div>
    </>
  );
}

export default Header;
