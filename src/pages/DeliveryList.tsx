import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatusTabs, Tab } from "@/components/common/StatusTabs";
import { SearchFilter, FilterField } from "@/components/common/SearchFilter";
import { DataTable, Column, StatusBadge, ActionButton } from "@/components/common/DataTable";
import { PageCard } from "@/components/common/PageCard";

interface Delivery {
  id: string;
  billNo: string;
  containerNo: string;
  containerType: string;
  status: string;
  customerCode: string;
  company: string;
  driver: string;
  phone: string;
  scheduledTime: string;
}

const tabs: Tab[] = [
  { key: "all", label: "ALL", count: 1000 },
  { key: "pending", label: "待预约提柜", count: 5 },
  { key: "booked", label: "已预约提柜" },
  { key: "picked", label: "已提柜" },
  { key: "storage", label: "放置堆场", count: 15 },
  { key: "delivering", label: "出派中" },
  { key: "received", label: "已签收", count: 980 },
  { key: "returned", label: "已还柜" },
];

const filterFields: FilterField[] = [
  { key: "containerNo", label: "柜号" },
  { key: "billNo", label: "提单号" },
  { key: "company", label: "派送公司" },
  { key: "customsName", label: "海关名称" },
  { key: "vehicleNo", label: "车辆号码" },
  { key: "port", label: "清关口岸" },
  { key: "driver", label: "司机姓名" },
];

const mockDataPending: Delivery[] = [
  {
    id: "1",
    billNo: "55-58558",
    containerNo: "CSNU6927227",
    containerType: "40尺",
    status: "待预约提柜",
    customerCode: "JK025",
    company: "运输公司1",
    driver: "司机1",
    phone: "1234567891",
    scheduledTime: "2025/12/12 23:26",
  },
  {
    id: "2",
    billNo: "55-58555",
    containerNo: "CSNU6927226",
    containerType: "40尺",
    status: "待预约提柜",
    customerCode: "JK025",
    company: "运输公司1",
    driver: "司机2",
    phone: "1234567892",
    scheduledTime: "",
  },
];

const mockDataDelivering: Delivery[] = [
  {
    id: "3",
    billNo: "55-58558",
    containerNo: "CSNU6927226",
    containerType: "40尺",
    status: "出派中",
    customerCode: "JK025",
    company: "运输公司1",
    driver: "司机1",
    phone: "1234567891",
    scheduledTime: "2025/12/12 23:26",
  },
];

const mockDataReceived: Delivery[] = [
  {
    id: "4",
    billNo: "55-58558",
    containerNo: "CSNU6927226",
    containerType: "40尺",
    status: "已签收",
    customerCode: "JK025",
    company: "运输公司1",
    driver: "司机1",
    phone: "1234567891",
    scheduledTime: "2025/12/12 23:26",
  },
];

export default function DeliveryList() {
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const getColumns = (statusType: string): Column<Delivery>[] => [
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
      key: "containerNo", 
      title: "货柜编号",
      render: (_, record) => (
        <a href="#" className="text-primary hover:underline">
          {record.containerNo}
        </a>
      )
    },
    { 
      key: "actions", 
      title: "操作",
      render: () => {
        switch (statusType) {
          case "pending":
            return (
              <div className="flex gap-1 flex-wrap">
                <ActionButton variant="primary">预约提柜</ActionButton>
                <ActionButton variant="success">派送预约</ActionButton>
              </div>
            );
          case "booked":
            return <ActionButton variant="warning">确认提柜</ActionButton>;
          case "picked":
            return <ActionButton variant="warning">放置堆场</ActionButton>;
          case "storage":
            return (
              <div className="flex gap-1">
                <ActionButton variant="primary">派送预约</ActionButton>
              </div>
            );
          case "delivering":
            return <ActionButton variant="success">确认交货</ActionButton>;
          case "received":
            return <ActionButton variant="primary">归还货柜</ActionButton>;
          default:
            return null;
        }
      }
    },
    { 
      key: "fee", 
      title: "费用",
      render: () => <ActionButton variant="warning">缴费</ActionButton>
    },
    { key: "containerType", title: "货柜型号" },
    { 
      key: "status", 
      title: "状态",
      render: (_, record) => {
        const statusMap: Record<string, "pending" | "processing" | "completed"> = {
          "待预约提柜": "pending",
          "已预约提柜": "processing",
          "已提柜": "processing",
          "放置堆场": "processing",
          "出派中": "processing",
          "已签收": "completed",
          "已还柜": "completed",
        };
        return <StatusBadge status={statusMap[record.status] || "pending"}>{record.status}</StatusBadge>;
      }
    },
    { key: "customerCode", title: "客户代码" },
    { key: "company", title: "运输公司" },
    { key: "driver", title: "司机姓名" },
    { key: "phone", title: "司机电话" },
    { key: "scheduledTime", title: statusType === "pending" ? "预约提柜时间" : "实际时间" },
  ];

  return (
    <MainLayout title="派送列表(跟单)">
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
          <PageCard title="派送管理(待预约提柜)">
            <DataTable columns={getColumns("pending")} data={mockDataPending} rowKey="id" />
          </PageCard>

          <PageCard title="派送管理(出派中)">
            <DataTable columns={getColumns("delivering")} data={mockDataDelivering} rowKey="id" />
          </PageCard>

          <PageCard title="派送管理(已签收)">
            <DataTable columns={getColumns("received")} data={mockDataReceived} rowKey="id" />
          </PageCard>
        </div>
      </div>
    </MainLayout>
  );
}
