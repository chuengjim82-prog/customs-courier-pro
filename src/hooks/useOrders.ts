import { useQuery } from "@tanstack/react-query";
import { fetchOrders, OrderApiItem } from "@/services/orderApi";

export interface Order {
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

function formatDate(dateStr: string | Record<string, unknown> | undefined): string {
  if (!dateStr || typeof dateStr !== "string") return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, "/");
  } catch {
    return "";
  }
}

function transformOrder(item: OrderApiItem): Order {
  return {
    id: String(item.id),
    billNo: item.waybillNo || item.orderNo || "",
    containerNo: typeof item.containerNo === "string" ? item.containerNo : "",
    shipping: item.shipperName || "",
    port: item.custPort || "",
    customerCode: typeof item.customerName === "string" ? item.customerName : "",
    agent: "",
    recipient: item.consigneeName || "",
    estimatedDate: formatDate(item.orderDate),
    shippingDate: "",
    arrivalDate: "",
    status: item.statuss || "",
    fees: { do: false, port: false, tax: false },
  };
}

export function useOrders(pageIndex = 1, pageSize = 50) {
  return useQuery({
    queryKey: ["orders", pageIndex, pageSize],
    queryFn: async () => {
      const response = await fetchOrders(pageIndex, pageSize);
      return {
        orders: response.data.items.map(transformOrder),
        total: response.data.total,
        pageIndex: response.data.pageIndex,
        pageSize: response.data.pageSize,
        totalPages: response.data.totalPages,
      };
    },
  });
}
