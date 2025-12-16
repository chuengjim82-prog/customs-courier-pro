import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatusTabs, Tab } from "@/components/common/StatusTabs";
import { SearchFilter, FilterField } from "@/components/common/SearchFilter";
import { DataTable, Column, StatusBadge, ActionButton } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ArrivalDialog } from "@/components/dialogs/ArrivalDialog";
import { OnlineDialog } from "@/components/dialogs/OnlineDialog";
import { DeclarationUploadDialog } from "@/components/dialogs/DeclarationUploadDialog";
import { ClearanceCompleteDialog } from "@/components/dialogs/ClearanceCompleteDialog";
import { toast } from "sonner";
import { useOrders, Order } from "@/hooks/useOrders";

const statusMap: Record<string, string> = {
  all: "all",
  pending: "资料待审核",
  reviewed: "资料已审核",
  clearing: "清关中",
  cleared: "清关完成",
  booked: "已预约提柜",
  picked: "已提柜",
  storage: "放置堆场",
  delivering: "出派中",
  received: "已签收",
  returned: "已还柜",
};

const tabs: Tab[] = [
  { key: "all", label: "ALL" },
  { key: "pending", label: "资料待审核" },
  { key: "reviewed", label: "资料已审核" },
  { key: "clearing", label: "清关中" },
  { key: "cleared", label: "清关完成" },
  { key: "booked", label: "已预约提柜" },
  { key: "picked", label: "已提柜" },
  { key: "storage", label: "放置堆场" },
  { key: "delivering", label: "出派中" },
  { key: "received", label: "已签收" },
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

export default function OrderList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [arrivalDialogOpen, setArrivalDialogOpen] = useState(false);
  const [onlineDialogOpen, setOnlineDialogOpen] = useState(false);
  const [declarationUploadDialogOpen, setDeclarationUploadDialogOpen] = useState(false);
  const [clearanceCompleteDialogOpen, setClearanceCompleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data, isLoading } = useOrders();
  const orders = data?.orders || [];

  const handleArrivalClick = (order: Order) => {
    setSelectedOrder(order);
    setArrivalDialogOpen(true);
  };

  const handleOnlineClick = (order: Order) => {
    setSelectedOrder(order);
    setOnlineDialogOpen(true);
  };

  const handleArrivalConfirm = (arrivalTime: string) => {
    toast.success(`订单 ${selectedOrder?.billNo} 到港时间已确认: ${arrivalTime.replace("T", " ")}`);
    setSelectedOrder(null);
  };

  const handleOnlineConfirm = (onlineTime: string) => {
    toast.success(`订单 ${selectedOrder?.billNo} 海关上网时间已确认: ${onlineTime.replace("T", " ")}`);
    setSelectedOrder(null);
  };

  const handleDeclarationUploadClick = (order: Order) => {
    setSelectedOrder(order);
    setDeclarationUploadDialogOpen(true);
  };

  const handleDeclarationUpload = (file: File) => {
    toast.success(`订单 ${selectedOrder?.billNo} 初步报关单 "${file.name}" 上传成功`);
    setSelectedOrder(null);
  };

  const handleClearanceCompleteClick = (order: Order) => {
    setSelectedOrder(order);
    setClearanceCompleteDialogOpen(true);
  };

  const handleClearanceCompleteConfirm = (clearanceTime: string) => {
    toast.success(`订单 ${selectedOrder?.billNo} 清关完成时间已确认: ${clearanceTime.replace("T", " ")}`);
    setSelectedOrder(null);
  };

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
        <div className="flex gap-1 flex-wrap">
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
          {record.status === "清关中" && (
            <>
              <ActionButton variant="primary" onClick={() => handleDeclarationUploadClick(record)}>回传初步报关单</ActionButton>
              <ActionButton variant="success" onClick={() => handleClearanceCompleteClick(record)}>清关完成</ActionButton>
            </>
          )}
          {record.status === "清关完成" && (
            <>
              <ActionButton variant="primary">回传最终报关单</ActionButton>
              <ActionButton variant="success">预约提柜</ActionButton>
            </>
          )}
          {record.status !== "清关中" && record.status !== "清关完成" && record.status !== "资料待审核" && record.status !== "资料已审核" && (
            <>
              <ActionButton variant="primary" onClick={() => handleArrivalClick(record)}>到港</ActionButton>
              <ActionButton variant="success" onClick={() => handleOnlineClick(record)}>上网</ActionButton>
            </>
          )}
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

        <DataTable 
          columns={columns} 
          data={activeTab === "all" ? orders : orders.filter(item => item.status === statusMap[activeTab])} 
          rowKey="id"
          loading={isLoading}
        />

        <div className="text-xs text-muted-foreground space-y-1 bg-muted/30 p-3 rounded-lg">
          <p><span className="font-medium">到港</span>：在船司网站能查到到港轨迹</p>
          <p><span className="font-medium">上网</span>：海关已能查询到提单号</p>
        </div>

        <ArrivalDialog
          open={arrivalDialogOpen}
          onOpenChange={setArrivalDialogOpen}
          billNo={selectedOrder?.billNo || ""}
          onConfirm={handleArrivalConfirm}
        />

        <OnlineDialog
          open={onlineDialogOpen}
          onOpenChange={setOnlineDialogOpen}
          billNo={selectedOrder?.billNo || ""}
          onConfirm={handleOnlineConfirm}
        />

        <DeclarationUploadDialog
          open={declarationUploadDialogOpen}
          onOpenChange={setDeclarationUploadDialogOpen}
          billNo={selectedOrder?.billNo || ""}
          onUpload={handleDeclarationUpload}
        />

        <ClearanceCompleteDialog
          open={clearanceCompleteDialogOpen}
          onOpenChange={setClearanceCompleteDialogOpen}
          billNo={selectedOrder?.billNo || ""}
          onConfirm={handleClearanceCompleteConfirm}
        />
      </div>
    </MainLayout>
  );
}
