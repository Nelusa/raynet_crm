import { CurrencyDollarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";

const monthlyData = [
  { month: "Led", sales: 1200000, deals: 12, conversion: 68 },
  { month: "Úno", sales: 1800000, deals: 15, conversion: 72 },
  { month: "Bře", sales: 1400000, deals: 10, conversion: 65 },
  { month: "Dub", sales: 2200000, deals: 18, conversion: 75 },
  { month: "Kvě", sales: 1600000, deals: 14, conversion: 70 },
  { month: "Čer", sales: 2400000, deals: 20, conversion: 78 },
];

export const SalesChart = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Přehled prodejů</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="revenue"
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger
              value="revenue"
              className="flex items-center gap-2"
            >
              <CurrencyDollarIcon className="h-4 w-4" />
              Obrat
            </TabsTrigger>
            <TabsTrigger
              value="deals"
              className="flex items-center gap-2"
            >
              <ChartBarIcon className="h-4 w-4" />
              Obchody
            </TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <div className="h-[300px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    strokeOpacity={0.4}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={formatCurrency}
                    width={85}
                  />
                  <Tooltip
                    formatter={(value, name) => [name === "sales" ? formatCurrency(value as number) : value, "Obrat"]}
                    labelStyle={{ color: "black" }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{
                      fill: "#2563eb",
                      strokeWidth: 2,
                      r: 4,
                      strokeDasharray: "",
                    }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="deals">
            <div className="h-[300px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    strokeOpacity={0.4}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    yAxisId="left"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={value => `${value}%`}
                  />
                  <Tooltip
                    formatter={(value, name) => [name === "Úspěšnost (%)" ? `${value}%` : value, name]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="deals"
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                    name="Počet obchodů"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="conversion"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={{ fill: "#16a34a", r: 4 }}
                    name="Úspěšnost (%)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
