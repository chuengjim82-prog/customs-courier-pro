import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatusTabs, Tab } from "@/components/common/StatusTabs";
import { SearchFilter, FilterField } from "@/components/common/SearchFilter";
import { DataTable, Column, StatusBadge, ActionButton } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Order {
  id: string;
  billNo: string;
  containerNo: string;
  shipping: string;
  port: string;
  customerCode: string;
  agent: string;
  recipient: string;
  estimatedDate: string;
  shippingDate: string;
  arrivalDate: string;
  status: string;
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

const filterFields: FilterField[] = [
  { key: "billNo", label: "提单号" },
  { key: "customerCode", label: "客户代码" },
  { key: "port", label: "清关口岸" },
  { key: "agent", label: "清关代理" },
  { key: "date", label: "日期" },
  { key: "deliveryCompany", label: "派送公司" },
];

const mockData: Order[] = [
  {
    id: "1",
    billNo: "55-58558",
    containerNo: "CSNU6927227",
    shipping: "COSCO",
    port: "DMM",
    customerCode: "JK025",
    agent: "AM",
    recipient: "XXX",
    estimatedDate: "2015/11/10",
    shippingDate: "",
    arrivalDate: "",
    status: "资料待审核",
    fees: { do: false, port: false, tax: false },
  },
  {
    id: "2",
    billNo: "55-58555",
    containerNo: "CSNU6927226",
    shipping: "COSCO",
    port: "DMM",
    customerCode: "JK025",
    agent: "AM",
    recipient: "XXX",
    estimatedDate: "2015/11/10",
    shippingDate: "",
    arrivalDate: "",
    status: "资料待审核",
    fees: { do: false, port: false, tax: false },
  },
];

export default function OrderList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const columns: Column<Order>[] = [
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
      key: "actions", 
      title: "操作",
      render: (_, record) => (
        <div className="flex gap-1">
          {record.status === "资料待审核" && (
            <ActionButton variant="warning" onClick={() => navigate(`/orders/${record.id}/review`)}>
              审核
            </ActionButton>
          )}
          {record.status === "资料已审核" && (
            <ActionButton variant="success" onClick={() => navigate(`/orders/${record.id}/declaration`)}>
              申报
            </ActionButton>
          )}
          <ActionButton variant="primary">到港</ActionButton>
          <ActionButton variant="success">上网</ActionButton>
        </div>
      )
    },
    { key: "containerNo", title: "柜号" },
    { key: "shipping", title: "船司" },
    { key: "port", title: "清关口岸" },
    { key: "customerCode", title: "客户代码" },
    { key: "agent", title: "清关代理" },
    { key: "recipient", title: "提单收件人" },
    { key: "estimatedDate", title: "预报日期" },
    { key: "shippingDate", title: "发运日期" },
    { key: "arrivalDate", title: "到港日期" },
    { 
      key: "status", 
      title: "状态",
      render: (_, record) => (
        <StatusBadge status="pending">{record.status}</StatusBadge>
      )
    },
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
    <MainLayout title="订单列表(跟单)">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <StatusTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <Button size="sm" className="gap-1.5" onClick={() => navigate("/orders/create")}>
            <Plus className="w-4 h-4" />
            创建订单
          </Button>
        </div>

        <SearchFilter
          fields={filterFields}
          values={filters}
          onChange={(key, value) => setFilters({ ...filters, [key]: value })}
          onSearch={() => console.log("Search:", filters)}
          onReset={() => setFilters({})}
        />

        <DataTable columns={columns} data={mockData} rowKey="id" />

        <div className="text-xs text-muted-foreground space-y-1 bg-muted/30 p-3 rounded-lg">
          <p><span className="font-medium">到港</span>：在船司网站能查到到港轨迹</p>
          <p><span className="font-medium">上网</span>：海关已能查询到提单号</p>
        </div>
      </div>
    </MainLayout>
  );
}
