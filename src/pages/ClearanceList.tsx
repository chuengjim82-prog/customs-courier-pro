import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatusTabs, Tab } from "@/components/common/StatusTabs";
import { SearchFilter, FilterField } from "@/components/common/SearchFilter";
import { DataTable, Column, StatusBadge, ActionButton } from "@/components/common/DataTable";
import { DeclarationUploadDialog } from "@/components/dialogs/DeclarationUploadDialog";
import { toast } from "sonner";

interface Clearance {
  id: string;
  billNo: string;
  status: string;
  containerNo: string;
  shipping: string;
  port: string;
  customerCode: string;
  agent: string;
  recipient: string;
  clearanceDate: string;
  fees: { do: boolean; port: boolean; tax: boolean };
}

const tabs: Tab[] = [
  { key: "all", label: "ALL", count: 1000 },
  { key: "pending", label: "资料待审核" },
  { key: "reviewed", label: "资料已审核" },
  { key: "clearing", label: "清关中", count: 10 },
  { key: "cleared", label: "清关完成" },
  { key: "booked", label: "已预约提柜" },
  { key: "picked", label: "已提柜" },
  { key: "storage", label: "放置堆场" },
  { key: "delivering", label: "出派中" },
  { key: "received", label: "已签收", count: 800 },
  { key: "returned", label: "已还柜" },
];

const filterFieldsClearing: FilterField[] = [
  { key: "billNo", label: "提单号" },
  { key: "orderNo", label: "订单号" },
  { key: "port", label: "清关口岸" },
  { key: "agent", label: "清关代理" },
  { key: "customerCode", label: "客户代码" },
  { key: "containerNo", label: "柜号" },
];

const mockDataClearing: Clearance[] = [
  {
    id: "1",
    billNo: "55-58559",
    status: "清关中",
    containerNo: "CSNU6927227",
    shipping: "COSCO",
    port: "DMM",
    customerCode: "JK025",
    agent: "AM",
    recipient: "XXX",
    clearanceDate: "2025/12/12",
    fees: { do: true, port: true, tax: false },
  },
  {
    id: "2",
    billNo: "55-58558",
    status: "清关中",
    containerNo: "CSNU6927227",
    shipping: "COSCO",
    port: "DMM",
    customerCode: "JK025",
    agent: "AM",
    recipient: "XXX",
    clearanceDate: "2025/12/12",
    fees: { do: true, port: true, tax: false },
  },
];

export default function ClearanceList() {
  const [activeTab, setActiveTab] = useState("clearing");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [declarationUploadDialogOpen, setDeclarationUploadDialogOpen] = useState(false);
  const [selectedClearance, setSelectedClearance] = useState<Clearance | null>(null);

  const handleDeclarationUploadClick = (clearance: Clearance) => {
    setSelectedClearance(clearance);
    setDeclarationUploadDialogOpen(true);
  };

  const handleDeclarationUpload = (file: File) => {
    toast.success(`订单 ${selectedClearance?.billNo} 初步报关单 "${file.name}" 上传成功`);
    setSelectedClearance(null);
  };

  const columnsClearing: Column<Clearance>[] = [
    { 
      key: "billNo", 
      title: "提单号",
      render: (_, record) => (
        <a href="#" className="text-primary hover:underline font-medium">
          {record.billNo}
        </a>
      )
    },
    { 
      key: "status", 
      title: "状态",
      render: (_, record) => (
        <StatusBadge status="processing">{record.status}</StatusBadge>
      )
    },
    { 
      key: "actions", 
      title: "操作",
      render: (_, record) => (
        <div className="flex gap-1">
          {record.status === "清关中" ? (
            <>
              <ActionButton variant="warning" onClick={() => handleDeclarationUploadClick(record)}>回传初步报关单</ActionButton>
              <ActionButton variant="success">清关完成</ActionButton>
            </>
          ) : (
            <>
              <ActionButton variant="warning">回传最终报关单</ActionButton>
              <ActionButton variant="primary">预约提柜</ActionButton>
            </>
          )}
        </div>
      )
    },
    { 
      key: "fee", 
      title: "费用",
      render: () => <ActionButton variant="warning">缴费</ActionButton>
    },
    { key: "containerNo", title: "柜号" },
    { key: "shipping", title: "船司" },
    { key: "port", title: "清关口岸" },
    { key: "customerCode", title: "客户代码" },
    { key: "agent", title: "清关代理" },
    { key: "recipient", title: "提单收件人" },
    { key: "clearanceDate", title: "海关申报" },
    { 
      key: "fees", 
      title: "缴费",
      render: (_, record) => (
        <div className="flex flex-col gap-0.5 text-xs">
          <label className="flex items-center gap-1">
            <input type="checkbox" checked={record.fees.do} readOnly className="w-3 h-3" />
            DO
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" checked={record.fees.port} readOnly className="w-3 h-3" />
            港杂
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" checked={record.fees.tax} readOnly className="w-3 h-3" />
            税
          </label>
        </div>
      )
    },
  ];

  return (
    <MainLayout title="清关列表(跟单)">
      <div className="space-y-4">
        <StatusTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <SearchFilter
          fields={filterFieldsClearing}
          values={filters}
          onChange={(key, value) => setFilters({ ...filters, [key]: value })}
          onSearch={() => console.log("Search:", filters)}
          onReset={() => setFilters({})}
        />

        <DataTable columns={columnsClearing} data={mockDataClearing} rowKey="id" />

        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
          <p>初步报关单要发给客户，客户需要这个初步报关单进行缴税</p>
        </div>

        <DeclarationUploadDialog
          open={declarationUploadDialogOpen}
          onOpenChange={setDeclarationUploadDialogOpen}
          billNo={selectedClearance?.billNo || ""}
          onUpload={handleDeclarationUpload}
        />
      </div>
    </MainLayout>
  );
}
