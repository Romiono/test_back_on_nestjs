export class CreateDeliveryDto {
  orderId: number; // ID оплаченного заказа
  deliveryAddress: string; // Адрес доставки
  deliveryDate: Date; // Дата доставки
}
