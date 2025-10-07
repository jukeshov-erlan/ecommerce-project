export default function formatMoney(amountCents) {
  const isNegative = amountCents < 0;
  const cost = Math.abs(amountCents / 100).toFixed(2);
  return isNegative ? `-$${cost}` : `$${cost}`
}
