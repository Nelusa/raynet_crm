import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  CalendarIcon,
  ReceiptRefundIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import logo from "@/assets/logo_raynet.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { View } from "@/components/Dashboard";

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const sidebarItems = [
  { icon: HomeIcon, label: "Přehled", value: "dashboard" as View },
  { icon: UsersIcon, label: "Firmy", value: "companies" as View },
  { icon: DocumentTextIcon, label: "Obchodní případy", value: "cases" as View },
  { icon: CalendarIcon, label: "Kalendář", value: "calendar" as View },
  { icon: ReceiptRefundIcon, label: "Fakturace", value: "invoices" as View },
  { icon: ChartBarIcon, label: "Reporty", value: "reports" as View },
];

const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
  return (
    <div className="flex h-screen w-16 flex-col border-r bg-white lg:w-64">
      <div className="flex items-center justify-center border-b p-4 lg:justify-start">
        <img
          src={logo}
          alt="Logo"
          className="h-20 w-20"
        />
        <span className="hidden text-xl font-semibold lg:block">CRM</span>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {sidebarItems.map(item => {
          const isActive = currentView === item.value;
          return (
            <Button
              key={item.value}
              variant={isActive ? "secondary" : "ghost"}
              className={cn("w-full justify-start gap-4", isActive && "bg-gray-100")}
              onClick={() => onViewChange(item.value)}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden lg:block">{item.label}</span>
            </Button>
          );
        })}
      </nav>

      <div className="space-y-1 border-t p-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-4"
        >
          <UserCircleIcon className="h-5 w-5" />
          <span className="hidden lg:block">Profil</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-4"
        >
          <Cog6ToothIcon className="h-5 w-5" />
          <span className="hidden lg:block">Nastavení</span>
        </Button>
        <Button
          variant="default"
          className="w-full justify-start gap-4"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span className="hidden lg:block">Nový case</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
