import { useState, useEffect } from "react";

import CompanyTable from "@/components/CompanyTable";
import FilterBar from "@/components/FilterBar";
import { KPICards } from "@/components/KPICards.tsx";
import { RecentActivities } from "@/components/RecentActivities.tsx";
import RightSidebar from "@/components/RightSidebar";
import { SalesChart } from "@/components/SalesChart.tsx";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

import { searchCompanies } from "@/api/raynetApi";

import type { BusinessCase } from "@/types/business.ts";
import type { Filter, FilterOption } from "@/types/filters.ts";

const ITEMS_PER_PAGE = 20;

export type View = "dashboard" | "companies" | "cases" | "calendar" | "invoices" | "reports";

const Dashboard = () => {
  const [view, setView] = useState<View>("dashboard");
  const [companies, setCompanies] = useState<BusinessCase[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filter>({});
  const [ownerOptions, setOwnerOptions] = useState<FilterOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await searchCompanies("", 0, 100, {});
        if (response.data) {
          const uniqueOwners = new Map();
          response.data.forEach(company => {
            if (company.owner) {
              uniqueOwners.set(company.owner.id, {
                id: company.owner.id,
                label: company.owner.fullName,
              });
            }
          });
          setOwnerOptions(Array.from(uniqueOwners.values()));
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await searchCompanies(searchTerm, offset, ITEMS_PER_PAGE, filters);
        setCompanies(response.data);
        setTotalItems(response.totalItems || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchData, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, currentPage, filters]);

  const handleFilterChange = (newFilters: Filter) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (view) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <KPICards />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <SalesChart />
              <RecentActivities />
            </div>
          </div>
        );
      case "cases":
        return (
          <div className="space-y-6">
            <FilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={filters}
              onFilterChange={handleFilterChange}
              ownerOptions={ownerOptions}
            />
            <CompanyTable
              companies={companies}
              isLoading={isLoading}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        );
      default:
        return (
          <div className="flex h-[400px] items-center justify-center">
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-semibold text-gray-700">Připravujeme</h3>
              <p className="text-gray-500">Tato sekce je momentálně ve vývoji.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentView={view}
        onViewChange={setView}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          currentView={view}
          onViewChange={setView}
        />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <h1 className="mb-6 text-2xl font-bold">
              {view === "dashboard" && "Přehled"}
              {view === "cases" && "Obchodní případy"}
              {view === "companies" && "Firmy"}
              {view === "calendar" && "Kalendář"}
              {view === "invoices" && "Fakturace"}
              {view === "reports" && "Reporty"}
            </h1>
            {renderContent()}
          </div>
        </main>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Dashboard;
