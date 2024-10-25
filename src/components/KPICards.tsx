import {
  BanknotesIcon,
  UsersIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const KPICard = ({ title, value, description, icon, trend }: KPICardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`flex items-center text-sm ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
            {trend.isPositive ? (
              <ArrowTrendingUpIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowTrendingDownIcon className="mr-1 h-4 w-4" />
            )}
            <span>{trend.value}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const KPICards = () => {
  const kpiData = [
    {
      title: "Celkový obrat",
      value: "2.350.000 Kč",
      description: "Celkový obrat za poslední měsíc",
      icon: <BanknotesIcon className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Aktivní klienti",
      value: "45",
      description: "Počet aktivních klientů",
      icon: <UsersIcon className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Nové příležitosti",
      value: "12",
      description: "Nové příležitosti tento měsíc",
      icon: <ChartBarIcon className="h-4 w-4 text-muted-foreground" />,
      trend: { value: 3, isPositive: false },
    },
    {
      title: "Nadcházející schůzky",
      value: "8",
      description: "Plánované schůzky tento týden",
      icon: <CalendarIcon className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <KPICard
          key={index}
          {...kpi}
        />
      ))}
    </div>
  );
};
