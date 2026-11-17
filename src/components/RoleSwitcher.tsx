"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserRole, UserRoleLabel } from "@/types/user";
import { useRouter, usePathname } from "next/navigation";
import { ROUTE_ROLES } from "@/config/routeRoles";
import { UserRound, Check, ChevronUp, Loader2 } from "lucide-react";

const ROLE_OPTIONS: UserRole[] = [1, 2, 3];

export default function RoleSwitcher() {
  const { user, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const handleSelectRole = async (role: UserRole) => {
    if (role === user.role || isSwitching) {
      setIsOpen(false);
      return;
    }

    setIsSwitching(true);
    try {
      await switchRole(role);
      setIsOpen(false);

      // Check if current route is allowed for the new role
      const allowedRoles = ROUTE_ROLES[pathname];
      if (!allowedRoles || !allowedRoles.includes(role)) {
        router.push("/");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to switch role:", err);
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Upward Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Switch Demo Role
          </div>
          <div className="h-px bg-slate-100 dark:bg-zinc-800 my-1" />
          <div className="space-y-0.5">
            {ROLE_OPTIONS.map((role) => {
              const isSelected = user.role === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleSelectRole(role)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-lg font-medium transition-colors cursor-pointer text-left ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 font-semibold"
                      : "text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        role === 1
                          ? "bg-purple-500"
                          : role === 2
                            ? "bg-sky-500"
                            : "bg-emerald-500"
                      }`}
                    />
                    <span>{UserRoleLabel[role]}</span>
                  </div>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isSwitching}
        className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        {isSwitching ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
        ) : (
          <UserRound className="h-3.5 w-3.5 text-slate-500" />
        )}
        <span className="truncate">
          {isSwitching ? "Switching..." : UserRoleLabel[user.role]}
        </span>
        <ChevronUp
          className={`ml-auto h-3.5 w-3.5 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
