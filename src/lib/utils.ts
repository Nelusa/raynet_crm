import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRoleLabel = (role: string) => {
  const roles = {
    C_SUPPLIER: "Dodavatel",
    E_OWN: "Vlastní",
    A_SUBSCRIBER: "Odběratel",
  };
  return roles[role as keyof typeof roles] || role;
};

export const getStateLabel = (state: string) => {
  const states = {
    A_POTENTIAL: "Potenciální",
    B_ACTUAL: "Aktivní",
  };
  return states[state as keyof typeof states] || state;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map(n => n[0])
    .join("");
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("cs-CZ");
};
