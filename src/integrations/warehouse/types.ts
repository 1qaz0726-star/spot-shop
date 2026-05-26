/**
 * 第三方倉儲 API 串接型別（預留，尚未實作）
 * 參考常見 WMS：建立出貨單、查詢物流狀態、取消出貨
 */

export type WarehouseShipmentRequest = {
  orderNo: string;
  recipient: {
    name: string;
    phone: string;
    address: string;
  };
  items: {
    sku: string;
    quantity: number;
    name: string;
  }[];
};

export type WarehouseShipmentResult = {
  success: boolean;
  warehouseRef?: string;
  trackingNo?: string;
  message?: string;
};

export interface WarehouseProvider {
  createShipment(req: WarehouseShipmentRequest): Promise<WarehouseShipmentResult>;
  getShipmentStatus(warehouseRef: string): Promise<{ status: string; trackingNo?: string }>;
  cancelShipment(warehouseRef: string): Promise<{ success: boolean }>;
}
