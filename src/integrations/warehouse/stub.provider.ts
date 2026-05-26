import type {
  WarehouseProvider,
  WarehouseShipmentRequest,
  WarehouseShipmentResult,
} from "./types";

/**
 * 佔位實作：訂單成立後可改為呼叫真實 WMS API
 */
export class StubWarehouseProvider implements WarehouseProvider {
  async createShipment(req: WarehouseShipmentRequest): Promise<WarehouseShipmentResult> {
    console.log("[Warehouse Stub] createShipment", req.orderNo);
    return {
      success: true,
      warehouseRef: `STUB-${req.orderNo}`,
      message: "尚未串接倉儲，此為佔位回傳",
    };
  }

  async getShipmentStatus(warehouseRef: string) {
    return { status: "pending", trackingNo: undefined };
  }

  async cancelShipment(_warehouseRef: string) {
    return { success: false };
  }
}
