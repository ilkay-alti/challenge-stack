"use client";
import { useLogout, useUser } from "@/hooks/useAuth";
import {
  LoaderCircleIcon,
  LogOutIcon,
  PiggyBankIcon,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const TopBar = () => {
  const getUser = useUser();
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getUser.mutate();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex items-center py-7 border-b border-[#1F3954] px-9 justify-between">
      <div className="flex items-center space-x-4">
        <PiggyBankIcon className="h-10 w-10" />
        <h1 className="text-4xl font-extrabold">Challenge-Stack</h1>
      </div>

      <div className="relative flex items-center space-x-6">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="font-bold text-xl w-10 h-10 rounded-lg bg-[#6F7E8C] text-white flex items-center justify-center"
        >
          {getUser.data?.name.slice(0, 2).toUpperCase()}
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
            className="absolute shadow top-14 right-0 bg-[#0d2946] flex flex-col items-center p-2 rounded-lg"
          >
            <Link
              href={"/settings"}
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 flex items-center gap-4 rounded-lg hover:bg-[#F1F5F9]/20"
            >
              <Settings className="h-7 w-7" />
              <h3 className="text-xl font-bold">Settings</h3>
            </Link>

            <button
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className="px-4 py-2 flex w-full rounded-lg hover:bg-[#F1F5F9]/20"
            >
              {logout.isPending ? (
                <LoaderCircleIcon className="h-6 w-6 animate-spin" />
              ) : (
                <div className="flex items-center gap-4">
                  <LogOutIcon className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Logout</h3>
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
