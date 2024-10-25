import { ArrowPathIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import BusinessCaseDialog from "@/components/Dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { getRoleLabel, getStateLabel } from "@/lib/utils";

import type { BusinessCase } from "@/types/business.ts";
import type { MouseEvent } from "react";

interface CompanyTableProps {
  companies: BusinessCase[];
  isLoading: boolean;
  onPageChange: (page: number) => void;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

const CompanyTable = ({
  companies,
  isLoading,
  onPageChange,
  totalItems,
  currentPage,
  itemsPerPage,
}: CompanyTableProps) => {
  const [selectedCase, setSelectedCase] = useState<BusinessCase | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRowClick = (businessCase: BusinessCase) => {
    setSelectedCase(businessCase);
    setIsDialogOpen(true);
  };

  //TODO (NL): Implement edit, delete and export functionality
  const handleEdit = (company: BusinessCase, e: MouseEvent) => {
    e.stopPropagation();
    console.log("Edit company:", company.id);
  };

  const handleDelete = (company: BusinessCase, e: MouseEvent) => {
    e.stopPropagation();
    console.log("Delete company:", company.id);
  };

  const handleExport = (company: BusinessCase, e: MouseEvent) => {
    e.stopPropagation();
    console.log("Export company:", company.id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-4">
          <ArrowPathIcon className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Načítání dat...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="w-12">
                  <Checkbox />
                </TableCell>
                <TableCell>Název</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Stav</TableCell>
                <TableCell>Vlastník</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Město</TableCell>
                <TableCell className="w-[100px]"></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map(company => (
                <TableRow
                  key={company.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(company)}
                >
                  <TableCell>
                    <Checkbox onClick={e => e.stopPropagation()} />
                  </TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getRoleLabel(company.role)}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={company.state === "B_ACTUAL" ? "success" : "secondary"}>
                      {getStateLabel(company.state)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {company.owner?.fullName
                            ?.split(" ")
                            .map(n => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span>{company.owner?.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge>{company.rating}</Badge>
                  </TableCell>
                  <TableCell>{company.primaryAddress?.address?.city || "-"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={e => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <EllipsisHorizontalIcon className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={e => handleEdit(company, e)}>Upravit</DropdownMenuItem>
                        <DropdownMenuItem onClick={e => handleExport(company, e)}>Exportovat</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={e => handleDelete(company, e)}
                          className="text-red-600 focus:text-red-600"
                        >
                          Smazat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between border-t px-4 py-4">
            <div className="text-sm text-muted-foreground">
              Zobrazeno {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} z{" "}
              {totalItems}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Předchozí
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage * itemsPerPage >= totalItems}
              >
                Další
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <BusinessCaseDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        businessCase={selectedCase}
      />
    </>
  );
};

export default CompanyTable;
