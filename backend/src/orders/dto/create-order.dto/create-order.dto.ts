export class CreateOrderDto {
  clientId: number; // ID клиента, который делает заказ
  orderItems: { productId: number; quantity: number }[]; // Список товаров в заказе
}
