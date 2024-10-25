import { StarIcon, BellIcon, UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: typeof StarIcon;
  label: string;
  onClick: () => void;
  notifications?: number;
}

const navItems: NavItem[] = [
  {
    icon: StarIcon,
    label: "Oblíbené",
    onClick: () => console.log("Favorites chosen"),
    notifications: 2,
  },
  {
    icon: BellIcon,
    label: "Notifikace",
    onClick: () => console.log("Notifications chosen"),
    notifications: 5,
  },
  {
    icon: UserCircleIcon,
    label: "Profil",
    onClick: () => console.log("Profile chosen"),
  },
  {
    icon: Cog6ToothIcon,
    label: "Nastavení",
    onClick: () => console.log("Settings chosen"),
  },
];

const RightSidebar = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className="flex w-12 flex-col items-center space-y-4 border-l bg-card py-4">
      {navItems.map((item, index) => (
        <div
          key={index}
          className="relative"
        >
          <Button
            variant="ghost"
            size="icon"
            className={cn("relative", activeItem === item.label && "bg-muted")}
            onClick={() => {
              setActiveItem(item.label);
              item.onClick();
            }}
          >
            <item.icon className="h-5 w-5" />
            {item.notifications && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {item.notifications}
              </span>
            )}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default RightSidebar;
