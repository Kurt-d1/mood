import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterControlsProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  platformFilter: string;
  setPlatformFilter: (value: string) => void;
  companyFilter: string;
  setCompanyFilter: (value: string) => void;
  isInternalUser: boolean;
}

export function FilterControls({
  statusFilter,
  setStatusFilter,
  platformFilter,
  setPlatformFilter,
  companyFilter,
  setCompanyFilter,
  isInternalUser
}: FilterControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Approved by client">Approved by client</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
        </SelectContent>
      </Select>

      <Select value={platformFilter} onValueChange={setPlatformFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          <SelectItem value="Instagram">Instagram</SelectItem>
          <SelectItem value="Facebook">Facebook</SelectItem>
          <SelectItem value="Twitter">Twitter</SelectItem>
        </SelectContent>
      </Select>

      {isInternalUser && (
        <Select value={companyFilter} onValueChange={setCompanyFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            <SelectItem value="TechCorp">TechCorp</SelectItem>
            <SelectItem value="MarketingPro">MarketingPro</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}