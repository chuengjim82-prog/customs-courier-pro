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

const mockData: Order[] = [
  { id: "1", billNo: "55-58558", containerNo: "CSNU6927227", shipping: "COSCO", port: "DMM", customerCode: "JK025", agent: "AM", recipient: "客户A", estimatedDate: "2025/11/10", shippingDate: "", arrivalDate: "", status: "资料待审核", fees: { do: false, port: false, tax: false } },
  { id: "2", billNo: "55-58555", containerNo: "CSNU6927226", shipping: "COSCO", port: "DMM", customerCode: "JK025", agent: "AM", recipient: "客户B", estimatedDate: "2025/11/10", shippingDate: "", arrivalDate: "", status: "资料待审核", fees: { do: false, port: false, tax: false } },
  { id: "3", billNo: "55-58560", containerNo: "ECMU8582301", shipping: "MSC", port: "JED", customerCode: "JK026", agent: "BM", recipient: "客户C", estimatedDate: "2025/11/12", shippingDate: "2025/11/08", arrivalDate: "", status: "资料已审核", fees: { do: true, port: false, tax: false } },
  { id: "4", billNo: "55-58561", containerNo: "TCKU6311253", shipping: "EVERGREEN", port: "DMM", customerCode: "JK027", agent: "AM", recipient: "客户D", estimatedDate: "2025/11/13", shippingDate: "2025/11/09", arrivalDate: "", status: "资料已审核", fees: { do: true, port: true, tax: false } },
  { id: "5", billNo: "55-58562", containerNo: "MSKU1234567", shipping: "COSCO", port: "JED", customerCode: "JK028", agent: "CM", recipient: "客户E", estimatedDate: "2025/11/14", shippingDate: "2025/11/10", arrivalDate: "2025/11/18", status: "清关中", fees: { do: true, port: true, tax: false } },
  { id: "6", billNo: "55-58563", containerNo: "HLXU7654321", shipping: "MSC", port: "DMM", customerCode: "JK029", agent: "AM", recipient: "客户F", estimatedDate: "2025/11/15", shippingDate: "2025/11/11", arrivalDate: "2025/11/19", status: "清关中", fees: { do: true, port: true, tax: true } },
  { id: "7", billNo: "55-58564", containerNo: "OOLU9876543", shipping: "OOCL", port: "JED", customerCode: "JK030", agent: "BM", recipient: "客户G", estimatedDate: "2025/11/16", shippingDate: "2025/11/12", arrivalDate: "2025/11/20", status: "清关完成", fees: { do: true, port: true, tax: true } },
  { id: "8", billNo: "55-58565", containerNo: "CMAU2468135", shipping: "CMA", port: "DMM", customerCode: "JK031", agent: "AM", recipient: "客户H", estimatedDate: "2025/11/17", shippingDate: "2025/11/13", arrivalDate: "2025/11/21", status: "清关完成", fees: { do: true, port: true, tax: true } },
  { id: "9", billNo: "55-58566", containerNo: "NYKU1357924", shipping: "ONE", port: "JED", customerCode: "JK032", agent: "CM", recipient: "客户I", estimatedDate: "2025/11/18", shippingDate: "2025/11/14", arrivalDate: "2025/11/22", status: "已预约提柜", fees: { do: true, port: true, tax: true } },
  { id: "10", billNo: "55-58567", containerNo: "SUDU8642097", shipping: "COSCO", port: "DMM", customerCode: "JK033", agent: "AM", recipient: "客户J", estimatedDate: "2025/11/19", shippingDate: "2025/11/15", arrivalDate: "2025/11/23", status: "已预约提柜", fees: { do: true, port: true, tax: true } },
  { id: "11", billNo: "55-58568", containerNo: "TRLU7531086", shipping: "MSC", port: "JED", customerCode: "JK034", agent: "BM", recipient: "客户K", estimatedDate: "2025/11/20", shippingDate: "2025/11/16", arrivalDate: "2025/11/24", status: "已提柜", fees: { do: true, port: true, tax: true } },
  { id: "12", billNo: "55-58569", containerNo: "CAIU9517382", shipping: "EVERGREEN", port: "DMM", customerCode: "JK035", agent: "AM", recipient: "客户L", estimatedDate: "2025/11/21", shippingDate: "2025/11/17", arrivalDate: "2025/11/25", status: "已提柜", fees: { do: true, port: true, tax: true } },
  { id: "13", billNo: "55-58570", containerNo: "BMOU4826159", shipping: "COSCO", port: "JED", customerCode: "JK036", agent: "CM", recipient: "客户M", estimatedDate: "2025/11/22", shippingDate: "2025/11/18", arrivalDate: "2025/11/26", status: "放置堆场", fees: { do: true, port: true, tax: true } },
  { id: "14", billNo: "55-58571", containerNo: "FCIU3692847", shipping: "CMA", port: "DMM", customerCode: "JK037", agent: "AM", recipient: "客户N", estimatedDate: "2025/11/23", shippingDate: "2025/11/19", arrivalDate: "2025/11/27", status: "放置堆场", fees: { do: true, port: true, tax: true } },
  { id: "15", billNo: "55-58572", containerNo: "GESU5147293", shipping: "ONE", port: "JED", customerCode: "JK038", agent: "BM", recipient: "客户O", estimatedDate: "2025/11/24", shippingDate: "2025/11/20", arrivalDate: "2025/11/28", status: "出派中", fees: { do: true, port: true, tax: true } },
  { id: "16", billNo: "55-58573", containerNo: "HDMU8263941", shipping: "MSC", port: "DMM", customerCode: "JK039", agent: "AM", recipient: "客户P", estimatedDate: "2025/11/25", shippingDate: "2025/11/21", arrivalDate: "2025/11/29", status: "出派中", fees: { do: true, port: true, tax: true } },
  { id: "17", billNo: "55-58574", containerNo: "APLU6394827", shipping: "COSCO", port: "JED", customerCode: "JK040", agent: "CM", recipient: "客户Q", estimatedDate: "2025/11/26", shippingDate: "2025/11/22", arrivalDate: "2025/11/30", status: "已签收", fees: { do: true, port: true, tax: true } },
  { id: "18", billNo: "55-58575", containerNo: "YMLU7284916", shipping: "YML", port: "DMM", customerCode: "JK041", agent: "AM", recipient: "客户R", estimatedDate: "2025/11/27", shippingDate: "2025/11/23", arrivalDate: "2025/12/01", status: "已签收", fees: { do: true, port: true, tax: true } },
  { id: "19", billNo: "55-58576", containerNo: "SEGU9173625", shipping: "EVERGREEN", port: "JED", customerCode: "JK042", agent: "BM", recipient: "客户S", estimatedDate: "2025/11/28", shippingDate: "2025/11/24", arrivalDate: "2025/12/02", status: "已还柜", fees: { do: true, port: true, tax: true } },
  { id: "20", billNo: "55-58577", containerNo: "PCIU8462739", shipping: "CMA", port: "DMM", customerCode: "JK043", agent: "AM", recipient: "客户T", estimatedDate: "2025/11/29", shippingDate: "2025/11/25", arrivalDate: "2025/12/03", status: "已还柜", fees: { do: true, port: true, tax: true } },
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
          {record.status === "清关中" ? (
            <>
              <ActionButton variant="primary" onClick={() => handleDeclarationUploadClick(record)}>回传初步报关单</ActionButton>
              <ActionButton variant="success" onClick={() => handleClearanceCompleteClick(record)}>清关完成</ActionButton>
            </>
          ) : (
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
          data={activeTab === "all" ? mockData : mockData.filter(item => item.status === statusMap[activeTab])} 
          rowKey="id" 
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
