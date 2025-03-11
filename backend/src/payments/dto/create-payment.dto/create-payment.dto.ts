export class CreatePaymentDto {
  orderId: number; // ID заказа, который оплачивается
  amount: number; // Сумма платежа
  status?: 'pending' | 'completed' | 'failed';
}
