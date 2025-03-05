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
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();
  const mutation = useLogout();
  //get user
  const getUser = useUser();
  useEffect(() => {
    getUser.mutate();
  }, []);
  return (
    <div
      className={` ${isOpen ? "w-full" : "w-min"} flex   flex-col  max-w-80 border-r border-[#1F3954] gap-4  `}
    >
      {/* // sidebartop */}
      <div
        className={`flex py-4 border-b border-[#1F3954] px-4 ${isOpen && "justify-between p-4"}`}
      >
        {isOpen && (
          <div className="flex items-center space-x-4">
            <PiggyBankIcon className="h-8 w-8" />
            <h1 className="text-xl font-extrabold">Challenge-Stack</h1>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center  hover:bg-gray-100/20 rounded-l p-4  ${!isOpen && "flex justify-center items-center w-full"}`}
        >
          {isOpen ? (
            <PanelRightOpenIcon className="h-8 w-8" />
          ) : (
            <PanelLeftOpenIcon className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* // sidebarbottom */}
      <div className="flex flex-col flex-grow gap-2">
        {navigation.map((nav) => (
          <Link
            key={nav.id}
            href={nav.href}
            className={`flex items-center  p-4 hover:bg-gray-100/20 mx-2 rounded-xl ${!isOpen && "justify-center"} ${
              pathname === nav.href
                ? "text-[#3091F3] bg-[#0A3763] hover:bg-[#0F4377]"
                : ""
            }`}
          >
            {nav.icon}
            <span
              className={`ml-4 text-xl font-bold ${isOpen ? "flex" : "hidden"}`}
            >
              {nav.name}
            </span>
          </Link>
        ))}
      </div>

      {/* // sidebarfooter */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#1F3954]">
        <h2 className={`font-bold text-xl ${isOpen ? "flex" : "hidden"}`}>
          {getUser.data?.name}
        </h2>
        <button
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          className={`text-white hover:bg-gray-100/20 hover:text-red-200 p-2 rounded-l }`}
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
