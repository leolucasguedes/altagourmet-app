export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.substring(1, text.length);
};
export function formatPrice(value: string) {
  const numericValue = parseFloat(value);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(numericValue);
}
export const fixPrice = (price: string) => {
  let priceStr = String(price);
  priceStr = priceStr.replace(/\D/g, "");

  // Garante que a string tem pelo menos três caracteres (para lidar com valores menores que 100 centavos)
  if (priceStr.length < 3) {
    priceStr = priceStr.padStart(3, "0");
  }

  // Divide a string em parte inteira e parte decimal
  const integerPart = priceStr.slice(0, -2);
  const decimalPart = priceStr.slice(-2);

  // Formata a parte inteira com pontos a cada 3 casas decimais
  const integerPartWithDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Retorna o preço formatado
  return `${integerPartWithDots},${decimalPart}`;
};
export function formatPhoneNumber(value: any) {
  if (!value) return value;

  // Remove todos os caracteres que não sejam números
  const phoneNumber = value.replace(/[^\d]/g, "");

  if (phoneNumber.length <= 2) {
    return `+${phoneNumber}`;
  } else if (phoneNumber.length <= 4) {
    return `+${phoneNumber.slice(0, 2)} (${phoneNumber.slice(2)}`;
  } else if (phoneNumber.length <= 9) {
    return `+${phoneNumber.slice(0, 2)} (${phoneNumber.slice(
      2,
      4
    )}) ${phoneNumber.slice(4)}`;
  }

  return `+${phoneNumber.slice(0, 2)} (${phoneNumber.slice(
    2,
    4
  )}) ${phoneNumber.slice(4, 9)}-${phoneNumber.slice(9, 13)}`;
}
export function obterUrlBase(urlCompleta: string) {
  try {
    const urlObj = new URL(urlCompleta);
    return urlObj.origin;
  } catch (error) {
    console.error("Erro ao analisar a URL:", error);
    return null;
  }
}
export const formatCurrency = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");
  const numValue = parseFloat(cleanedValue) / 100;

  return numValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
