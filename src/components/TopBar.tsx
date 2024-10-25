import { HomeIcon, DocumentTextIcon, ReceiptRefundIcon } from "@heroicons/react/24/outline";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils.ts";

import type { View } from "@/components/Dashboard";

interface TopBarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const navigationItems = [
  { icon: HomeIcon, label: "Nástěnka", value: "dashboard" as View },
  { icon: DocumentTextIcon, label: "Obchodní případy", value: "cases" as View },
  { icon: ReceiptRefundIcon, label: "Fakturace", value: "invoices" as View },
];

const TopBar = ({ currentView, onViewChange }: TopBarProps) => {
  return (
    <header className="border-b bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <nav className="flex items-center space-x-4">
          {navigationItems.map(item => (
            <Button
              key={item.value}
              variant="ghost"
              className={cn("flex items-center gap-2", currentView === item.value && "font-semibold")}
              onClick={() => onViewChange(item.value)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback>NL</AvatarFallback>
                </Avatar>
                <span>N. Letochová</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Nastavení</DropdownMenuItem>
              <DropdownMenuItem>Odhlásit se</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
