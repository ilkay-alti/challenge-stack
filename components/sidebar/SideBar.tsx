"use client";
import React, { useEffect } from "react";
import {
  ArrowRightLeftIcon,
  LayoutDashboardIcon,
  LoaderCircleIcon,
  LogOutIcon,
  PanelLeftOpenIcon,
  PanelRightOpenIcon,
  PiggyBankIcon,
  SwordsIcon,
  TrendingUpDownIcon,
} from "lucide-react";
import Link from "next/link";
import { useLogout, useUser } from "@/hooks/useAuth";

const navigation = [
  {
    id: 1,
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboardIcon className="h-8 w-8" />,
  },
  {
    id: 2,
    name: "Transactions",
    href: "/transactions",
    icon: <ArrowRightLeftIcon className="h-8 w-8" />,
  },
  {
    id: 3,
    name: "Futures",
    href: "/futures",
    icon: <TrendingUpDownIcon className="h-8 w-8" />,
  },
  {
    id: 4,
    name: "Challenge",
    href: "/challenge",
    icon: <SwordsIcon className="h-8 w-8" />,
  },
];
const SideBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const mutation = useLogout();
  //get user
  const getUser = useUser();
  useEffect(() => {
    getUser.mutate();
  }, []);
  return (
    <div
      className={` ${isOpen ? "w-min" : "w-full"} flex   flex-col  max-w-80 border-r border-[#1F3954] gap-4  `}
    >
      {/* // sidebartop */}
      <div
        className={`flex py-4 border-b border-[#1F3954] px-4 ${!isOpen && "justify-between "}`}
      >
        {!isOpen && (
          <div className="flex items-center space-x-5">
            <PiggyBankIcon className="h-8 w-8" />
            <h1 className="text-xl font-extrabold">Challenge-Stack</h1>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center  hover:bg-gray-100/20 rounded-l  ${isOpen ? "flez justify-center items-center w-full py-2" : ""}`}
        >
          {isOpen ? (
            <PanelLeftOpenIcon className="h-8 w-8" />
          ) : (
            <PanelRightOpenIcon className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* // sidebarbottom */}
      <div className="flex flex-col flex-grow gap-2">
        {navigation.map((nav) => (
          <Link
            key={nav.id}
            href={nav.href}
            className={`flex items-center  p-4 hover:bg-gray-100/20 mx-2 rounded-xl ${isOpen ? "justify-center" : ""}`}
          >
            {nav.icon}
            <span className={`ml-4 ${isOpen ? "hidden" : "flex"}`}>
              {nav.name}
            </span>
          </Link>
        ))}
      </div>

      {/* // sidebarfooter */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#1F3954]">
        <h2 className={`font-bold text-xl ${isOpen ? "hidden" : "flex"}`}>
          {getUser.data?.name}
        </h2>
        <button
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          className="text-white hover:bg-gray-100/20 hover:text-red-200 p-2 rounded-l"
        >
          {mutation.isPending ? (
            <LoaderCircleIcon className="h-6 w-6 animate-spin" />
          ) : (
            <LogOutIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
