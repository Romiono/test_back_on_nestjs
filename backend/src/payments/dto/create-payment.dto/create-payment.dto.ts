export class CreatePaymentDto {
  orderId: number; // ID заказа, который оплачивается
  amount: number; // Сумма платежа
  paymentMethod: string; // Метод оплаты (карта, PayPal, криптовалюта и т.д.)
}
