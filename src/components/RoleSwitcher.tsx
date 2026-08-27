"use client";

import { useAuth } from "@/context/AuthContext";
import { UserRole, UserRoleLabel } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserRound, Check, ChevronDown } from "lucide-react";

const ROLE_OPTIONS: UserRole[] = [1, 2, 3];

export default function RoleSwitcher() {
  const { user, switchRole } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 cursor-pointer hover:bg-gray-50">
          <UserRound className="h-4 w-4" />
          <span className="font-medium">{UserRoleLabel[user.role]}</span>
          <ChevronDown className="ml-auto h-3.5 w-3.5 text-slate-400" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Switch demo role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ROLE_OPTIONS.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => switchRole(role)}
            className="flex items-center justify-between cursor-pointer"
          >
            {UserRoleLabel[role]}
            {user.role === role && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
