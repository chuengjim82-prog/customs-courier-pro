import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatusTabs, Tab } from "@/components/common/StatusTabs";
import { SearchFilter, FilterField } from "@/components/common/SearchFilter";
import { DataTable, Column, StatusBadge, ActionButton } from "@/components/common/DataTable";
import { PageCard } from "@/components/common/PageCard";

interface Income {
  id: string;
  businessNo: string;
  customer: string;
  country: string;
  service: string;
  status: string;
  businessDate: string;
  confirmDate: string;
  currency: string;
  amount: number;
  remark: string;
  creator: string;
  createTime: string;
}

const tabs: Tab[] = [
  { key: "search", label: "查询" },
  { key: "all", label: "ALL", count: 1000 },
  { key: "pending", label: "待确认", count: 4 },
  { key: "confirmed", label: "已确认", count: 996 },
];

const filterFields: FilterField[] = [
  { key: "businessNo", label: "业务单号" },
  { key: "country", label: "国家" },
  { key: "service", label: "产品服务" },
  { key: "customer", label: "客户" },
  { key: "businessDate", label: "业务日期" },
];

const mockDataPending: Income[] = [
  {
    id: "1",
    businessNo: "55-58558",
    customer: "客户2",
    country: "SA",
    service: "清关",
    status: "待确认",
    businessDate: "2025/11/20",
    confirmDate: "",
    currency: "SAR",
    amount: 8866.00,
    remark: "",
    creator: "jim",
    createTime: "2025/11/24",
  },
  {
    id: "2",
    businessNo: "55-58555",
    customer: "客户1",
    country: "SA",
    service: "清关",
    status: "待确认",
    businessDate: "2025/11/14",
    confirmDate: "",
    currency: "SAR",
    amount: 633.00,
    remark: "",
    creator: "jim",
    createTime: "2025/11/24",
  },
];

const mockDataConfirmed: Income[] = [
  {
    id: "3",
    businessNo: "55-58558",
    customer: "客户2",
    country: "SA",
    service: "清关",
    status: "已确认",
    businessDate: "2025/11/20",
    confirmDate: "2025/11/25",
    currency: "SAR",
    amount: 8866.00,
    remark: "",
    creator: "jim",
    createTime: "2025/11/24",
  },
  {
    id: "4",
    businessNo: "55-58555",
    customer: "客户1",
    country: "SA",
    service: "清关",
    status: "已确认",
    businessDate: "2025/11/14",
    confirmDate: "2025/11/24",
    currency: "SAR",
    amount: 633.00,
    remark: "",
    creator: "jim",
    createTime: "2025/11/24",
  },
];

export default function IncomeList() {
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const columnsPending: Column<Income>[] = [
    { key: "businessNo", title: "业务单号" },
    { 
      key: "actions", 
      title: "操作",
      render: () => <ActionButton variant="success">确认收入</ActionButton>
    },
    { key: "customer", title: "客户" },
    { key: "country", title: "国家" },
    { key: "service", title: "产品服务" },
    { 
      key: "status", 
      title: "状态",
      render: (_, record) => (
        <StatusBadge status={record.status === "待确认" ? "pending" : "completed"}>
          {record.status}
        </StatusBadge>
      )
    },
    { key: "businessDate", title: "业务日期" },
    { key: "currency", title: "币种" },
    { 
      key: "amount", 
      title: "收入金额",
      render: (_, record) => (
        <span className="font-medium">{record.amount.toLocaleString()}</span>
      )
    },
    { key: "remark", title: "备注" },
    { key: "creator", title: "创建人" },
    { key: "createTime", title: "创建时间" },
  ];

  const columnsConfirmed: Column<Income>[] = [
    { key: "businessNo", title: "业务单号" },
    { key: "customer", title: "客户" },
    { key: "country", title: "国家" },
    { key: "service", title: "产品服务" },
    { 
      key: "status", 
      title: "状态",
      render: (_, record) => (
        <StatusBadge status="completed">{record.status}</StatusBadge>
      )
    },
    { key: "businessDate", title: "业务日期" },
    { key: "confirmDate", title: "确认日期" },
    { key: "currency", title: "币种" },
    { 
      key: "amount", 
      title: "收入金额",
      render: (_, record) => (
        <span className="font-medium text-status-completed">{record.amount.toLocaleString()}</span>
      )
    },
    { key: "remark", title: "备注" },
    { key: "creator", title: "创建人" },
    { key: "createTime", title: "创建时间" },
  ];

  return (
    <MainLayout title="收入确认列表(跟单)">
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
          <PageCard title="收入确认列表(待确认)">
            <DataTable columns={columnsPending} data={mockDataPending} rowKey="id" />
          </PageCard>

          <PageCard title="收入确认列表(已确认)">
            <DataTable columns={columnsConfirmed} data={mockDataConfirmed} rowKey="id" />
          </PageCard>
        </div>
      </div>
    </MainLayout>
  );
}
