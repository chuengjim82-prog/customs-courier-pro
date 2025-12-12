import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatusTabs, Tab } from "@/components/common/StatusTabs";
import { SearchFilter, FilterField } from "@/components/common/SearchFilter";
import { DataTable, Column, StatusBadge, ActionButton } from "@/components/common/DataTable";
import { PageCard } from "@/components/common/PageCard";

interface Payment {
  id: string;
  requestNo: string;
  businessNo: string;
  service: string;
  country: string;
  supplier: string;
  currency: string;
  requestAmount: number;
  paidAmount: number;
  paymentReason: string;
  paymentDate: string;
  status: string;
  remark: string;
  creator: string;
  createTime: string;
}

const tabs: Tab[] = [
  { key: "search", label: "查询" },
  { key: "all", label: "ALL", count: 1000 },
  { key: "pending", label: "待审核" },
  { key: "awaiting", label: "待付款", count: 4 },
  { key: "paid", label: "已付款" },
  { key: "closed", label: "已关闭" },
];

const filterFields: FilterField[] = [
  { key: "businessNo", label: "业务单号" },
  { key: "requestNo", label: "付款申请号" },
  { key: "supplier", label: "供应商" },
  { key: "createTime", label: "创建时间" },
  { key: "reason", label: "费用名称" },
  { key: "service", label: "产品服务" },
  { key: "country", label: "国家" },
  { key: "applicant", label: "申请人" },
];

const mockDataPending: Payment[] = [
  {
    id: "1",
    requestNo: "PKSQ251125001",
    businessNo: "55-58558",
    service: "清关",
    country: "SA",
    supplier: "供应商1",
    currency: "SAR",
    requestAmount: 8866.00,
    paidAmount: 0,
    paymentReason: "DO款",
    paymentDate: "",
    status: "待审核",
    remark: "",
    creator: "jim",
    createTime: "2025/11/24",
  },
  {
    id: "2",
    requestNo: "PKSQ251124001",
    businessNo: "55-58555",
    service: "清关",
    country: "SA",
    supplier: "供应商1",
    currency: "SAR",
    requestAmount: 633.00,
    paidAmount: 0,
    paymentReason: "港杂费",
    paymentDate: "",
    status: "待审核",
    remark: "",
    creator: "jim",
    createTime: "2025/11/24",
  },
];

const mockDataAwaiting: Payment[] = [
  {
    id: "3",
    requestNo: "PKSQ251125001",
    businessNo: "55-58558",
    service: "清关",
    country: "SA",
    supplier: "供应商1",
    currency: "SAR",
    requestAmount: 8866.00,
    paidAmount: 0,
    paymentReason: "DO款",
    paymentDate: "",
    status: "待付款",
    remark: "",
    creator: "jim",
    createTime: "2025/11/24",
  },
];

const mockDataPaid: Payment[] = [
  {
    id: "4",
    requestNo: "PKSQ251125001",
    businessNo: "55-58558",
    service: "清关",
    country: "SA",
    supplier: "供应商1",
    currency: "SAR",
    requestAmount: 8866.00,
    paidAmount: 8866.00,
    paymentReason: "DO款",
    paymentDate: "2025/12/12",
    status: "已付款",
    remark: "",
    creator: "jim",
    createTime: "2025/11/24",
  },
];

const mockDataClosed: Payment[] = [
  {
    id: "5",
    requestNo: "PKSQ251125001",
    businessNo: "55-58558",
    service: "清关",
    country: "SA",
    supplier: "供应商1",
    currency: "SAR",
    requestAmount: 8866.00,
    paidAmount: 0,
    paymentReason: "DO款",
    paymentDate: "",
    status: "已关闭",
    remark: "",
    creator: "jim",
    createTime: "2025/11/24",
  },
];

export default function PaymentList() {
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const getStatusBadgeType = (status: string): "pending" | "processing" | "completed" | "closed" => {
    switch (status) {
      case "待审核": return "pending";
      case "待付款": return "processing";
      case "已付款": return "completed";
      case "已关闭": return "closed";
      default: return "pending";
    }
  };

  const columnsPending: Column<Payment>[] = [
    { 
      key: "requestNo", 
      title: "申请单号",
      render: (_, record) => (
        <a href="#" className="text-primary hover:underline font-medium">
          {record.requestNo}
        </a>
      )
    },
    { 
      key: "actions", 
      title: "操作",
      render: () => <ActionButton variant="warning">审核</ActionButton>
    },
    { 
      key: "status", 
      title: "状态",
      render: (_, record) => (
        <StatusBadge status={getStatusBadgeType(record.status)}>{record.status}</StatusBadge>
      )
    },
    { key: "businessNo", title: "业务单号" },
    { key: "service", title: "产品服务" },
    { key: "country", title: "国家" },
    { key: "supplier", title: "供应商" },
    { key: "currency", title: "申请币种" },
    { 
      key: "requestAmount", 
      title: "申请金额",
      render: (_, record) => (
        <span className="font-medium">{record.requestAmount.toLocaleString()}</span>
      )
    },
    { key: "paymentReason", title: "付款原由" },
    { key: "remark", title: "备注" },
    { key: "creator", title: "创建人" },
    { key: "createTime", title: "创建时间" },
  ];

  const columnsAwaiting: Column<Payment>[] = [
    { 
      key: "requestNo", 
      title: "申请单号",
      render: (_, record) => (
        <a href="#" className="text-primary hover:underline font-medium">
          {record.requestNo}
        </a>
      )
    },
    { 
      key: "actions", 
      title: "操作",
      render: () => <ActionButton variant="success">付款</ActionButton>
    },
    { 
      key: "status", 
      title: "状态",
      render: (_, record) => (
        <StatusBadge status="processing">{record.status}</StatusBadge>
      )
    },
    { key: "businessNo", title: "业务单号" },
    { key: "service", title: "产品服务" },
    { key: "country", title: "国家" },
    { key: "supplier", title: "供应商" },
    { key: "currency", title: "申请币种" },
    { 
      key: "requestAmount", 
      title: "申请金额",
      render: (_, record) => (
        <span className="font-medium">{record.requestAmount.toLocaleString()}</span>
      )
    },
    { key: "paymentReason", title: "付款原由" },
    { key: "remark", title: "备注" },
    { key: "creator", title: "创建人" },
    { key: "createTime", title: "创建时间" },
  ];

  const columnsPaid: Column<Payment>[] = [
    { 
      key: "requestNo", 
      title: "申请单号",
      render: (_, record) => (
        <a href="#" className="text-primary hover:underline font-medium">
          {record.requestNo}
        </a>
      )
    },
    { 
      key: "status", 
      title: "状态",
      render: (_, record) => (
        <StatusBadge status="completed">{record.status}</StatusBadge>
      )
    },
    { key: "businessNo", title: "业务单号" },
    { key: "service", title: "产品服务" },
    { key: "country", title: "国家" },
    { key: "supplier", title: "供应商" },
    { key: "currency", title: "申请币种" },
    { 
      key: "requestAmount", 
      title: "申请金额",
      render: (_, record) => (
        <span className="font-medium">{record.requestAmount.toLocaleString()}</span>
      )
    },
    { key: "paymentDate", title: "实付日期" },
    { 
      key: "paidAmount", 
      title: "实付金额",
      render: (_, record) => (
        <span className="font-medium text-status-completed">{record.paidAmount.toLocaleString()}</span>
      )
    },
    { key: "paymentReason", title: "付款原由" },
    { key: "remark", title: "备注" },
    { key: "creator", title: "创建人" },
    { key: "createTime", title: "创建时间" },
  ];

  const columnsClosed: Column<Payment>[] = [
    { 
      key: "requestNo", 
      title: "申请单号",
      render: (_, record) => (
        <a href="#" className="text-primary hover:underline font-medium">
          {record.requestNo}
        </a>
      )
    },
    { 
      key: "status", 
      title: "状态",
      render: (_, record) => (
        <StatusBadge status="closed">{record.status}</StatusBadge>
      )
    },
    { key: "businessNo", title: "业务单号" },
    { key: "service", title: "产品服务" },
    { key: "country", title: "国家" },
    { key: "supplier", title: "供应商" },
    { key: "currency", title: "申请币种" },
    { 
      key: "requestAmount", 
      title: "申请金额",
      render: (_, record) => (
        <span className="font-medium">{record.requestAmount.toLocaleString()}</span>
      )
    },
    { key: "paymentDate", title: "实付日期" },
    { 
      key: "paidAmount", 
      title: "实付金额",
      render: (_, record) => (
        <span className="font-medium">{record.paidAmount.toLocaleString()}</span>
      )
    },
    { key: "paymentReason", title: "付款原由" },
    { key: "remark", title: "备注" },
    { key: "creator", title: "创建人" },
    { key: "createTime", title: "创建时间" },
  ];

  return (
    <MainLayout title="付款申请列表(跟单)">
      <div className="space-y-4">
        <StatusTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <SearchFilter
          fields={filterFields}
          values={filters}
          onChange={(key, value) => setFilters({ ...filters, [key]: value })}
          onSearch={() => console.log("Search:", filters)}
          onReset={() => setFilters({})}
        />

        <div className="space-y-6">
          <PageCard title="付款申请列表(待审核)">
            <DataTable columns={columnsPending} data={mockDataPending} rowKey="id" />
          </PageCard>

          <PageCard title="付款申请列表(待付款)">
            <DataTable columns={columnsAwaiting} data={mockDataAwaiting} rowKey="id" />
          </PageCard>

          <PageCard title="付款申请列表(已付款)">
            <DataTable columns={columnsPaid} data={mockDataPaid} rowKey="id" />
          </PageCard>

          <PageCard title="付款申请列表(已关闭)">
            <DataTable columns={columnsClosed} data={mockDataClosed} rowKey="id" />
          </PageCard>
        </div>
      </div>
    </MainLayout>
  );
}
