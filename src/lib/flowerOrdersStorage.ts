export type FlowerOrderStatus =
  | 'Creada'
  | 'Confirmada'
  | 'En preparacion'
  | 'En ruta'
  | 'Entregada';

export type FlowerPaymentStatus =
  | 'pendiente'
  | 'aprobado'
  | 'rechazado'
  | 'error';

export const FLOWER_ORDER_STATUS_STEPS: FlowerOrderStatus[] = [
  'Creada',
  'Confirmada',
  'En preparacion',
  'En ruta',
  'Entregada',
];

export interface FlowerOrderEvent {
  status: FlowerOrderStatus;
  timestamp: string;
  note: string;
}

export interface FlowerOrderItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

export interface FlowerOrderRecord {
  id: string;
  orderCode: string;
  status: FlowerOrderStatus;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  recipientName: string;
  deliveryAddress: string;
  deliveryDate: string;
  cardMessage: string;
  items: FlowerOrderItem[];
  total: number;
  source: 'single' | 'cart';
  events: FlowerOrderEvent[];
  paymentStatus?: FlowerPaymentStatus;
  paymentProvider?: 'wompi';
  paymentReference?: string;
  paymentTransactionId?: string;
  paymentMethodType?: string;
  paidAt?: string;
}

export const FLOWER_ORDERS_STORAGE_KEY = 'jdr.floreria.orders.v1';

function normalizeStatus(value: unknown): FlowerOrderStatus {
  if (typeof value !== 'string') {
    return 'Creada';
  }
  return FLOWER_ORDER_STATUS_STEPS.includes(value as FlowerOrderStatus)
    ? (value as FlowerOrderStatus)
    : 'Creada';
}

function normalizeEvent(record: Partial<FlowerOrderEvent>): FlowerOrderEvent {
  return {
    status: normalizeStatus(record.status),
    timestamp: record.timestamp ?? new Date().toISOString(),
    note: record.note ?? 'Evento de trazabilidad',
  };
}

function normalizeItem(record: Partial<FlowerOrderItem>): FlowerOrderItem | null {
  if (!record.id || !record.nombre) {
    return null;
  }
  return {
    id: record.id,
    nombre: record.nombre,
    precio: Number(record.precio) || 0,
    cantidad: Number(record.cantidad) || 1,
  };
}

function normalizeOrder(record: Partial<FlowerOrderRecord>): FlowerOrderRecord | null {
  if (!record.id || !record.orderCode) {
    return null;
  }

  const items = Array.isArray(record.items)
    ? record.items
        .map((item) => normalizeItem(item as Partial<FlowerOrderItem>))
        .filter(Boolean) as FlowerOrderItem[]
    : [];

  const events = Array.isArray(record.events)
    ? record.events.map((event) => normalizeEvent(event as Partial<FlowerOrderEvent>))
    : [];

  return {
    id: record.id,
    orderCode: record.orderCode.toUpperCase(),
    status: normalizeStatus(record.status),
    createdAt: record.createdAt ?? new Date().toISOString(),
    customerName: record.customerName ?? '',
    customerPhone: record.customerPhone ?? '',
    customerEmail: record.customerEmail ?? '',
    recipientName: record.recipientName ?? '',
    deliveryAddress: record.deliveryAddress ?? '',
    deliveryDate: record.deliveryDate ?? '',
    cardMessage: record.cardMessage ?? '',
    items,
    total: Number(record.total) || 0,
    source: record.source === 'cart' ? 'cart' : 'single',
    events,
    paymentStatus:
      record.paymentStatus === 'aprobado' ||
      record.paymentStatus === 'rechazado' ||
      record.paymentStatus === 'error'
        ? record.paymentStatus
        : record.paymentStatus === 'pendiente'
          ? 'pendiente'
          : undefined,
    paymentProvider: record.paymentProvider === 'wompi' ? 'wompi' : undefined,
    paymentReference: record.paymentReference ?? '',
    paymentTransactionId: record.paymentTransactionId ?? '',
    paymentMethodType: record.paymentMethodType ?? '',
    paidAt: record.paidAt ?? '',
  };
}

export function readFlowerOrders() {
  if (typeof window === 'undefined') {
    return [] as FlowerOrderRecord[];
  }

  const raw = window.localStorage.getItem(FLOWER_ORDERS_STORAGE_KEY);
  if (!raw) {
    return [] as FlowerOrderRecord[];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [] as FlowerOrderRecord[];
    }

    return parsed
      .map((record) => normalizeOrder(record as Partial<FlowerOrderRecord>))
      .filter(Boolean) as FlowerOrderRecord[];
  } catch {
    return [] as FlowerOrderRecord[];
  }
}

export function writeFlowerOrders(orders: FlowerOrderRecord[]) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(FLOWER_ORDERS_STORAGE_KEY, JSON.stringify(orders));
}
