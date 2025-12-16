const API_BASE_URL = "http://8.134.102.174:8002/api";

export interface OrderApiItem {
  id: number;
  statusi: number;
  statuss: string;
  status1: number;
  orderNo: string;
  waybillNo: string;
  orderDate: string;
  containerNo: Record<string, unknown> | string;
  serviceId: number;
  custPortId: number;
  custPickup: boolean;
  custAgentId: number;
  transAgentId: number;
  countryId: number;
  remark: string;
  isDeleted: boolean;
  creatorId: number;
  creatorNic: Record<string, unknown> | string;
  createTime: Record<string, unknown> | string;
  updaterId: Record<string, unknown> | number;
  updaterNic: Record<string, unknown> | string;
  updateTime: Record<string, unknown> | string;
  deleterId: Record<string, unknown> | number;
  deleterNic: Record<string, unknown> | string;
  deleteTime: Record<string, unknown> | string;
  shipperName: string;
  custPort: string;
  customerId: Record<string, unknown> | number;
  consigneeName: string;
  consigneeAddress: string;
  customerName: Record<string, unknown> | string;
}

export interface OrderApiResponse {
  code: number;
  message: string;
  data: {
    items: OrderApiItem[];
    total: number;
    pageIndex: number;
    pageSize: number;
    totalPages: number;
  };
}

export async function fetchOrders(pageIndex = 1, pageSize = 10): Promise<OrderApiResponse> {
  const response = await fetch(`${API_BASE_URL}/dynamic/order-base-info?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
    headers: {
      "Accept": "application/json",
      "Cache-Control": "no-cache",
    },
  });
  
  if (!response.ok) {
    throw new Error(`API请求失败: ${response.status}`);
  }
  
  return response.json();
}
