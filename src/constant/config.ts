export const siteConfig = {
  title: "FinTrack",
  titleAr: "فن تراك",
  description: "Record expenses and revenues simply!",
  descriptionAr: "سجل المصروفات والإيرادات بساطة!",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://fintrack.cash",
};

export const DEFAULT_CURRENCY = "USD";

export const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
  { code: "EGP", symbol: "ج.م", name: "Egyptian Pound" },
  { code: "SAR", symbol: "SR", name: "Saudi Riyal" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "QAR", symbol: "QR", name: "Qatari Riyal" },
  { code: "OMR", symbol: "OMR", name: "Omani Rial" },
  { code: "KWD", symbol: "KD", name: "Kuwaiti Dinar" },
  { code: "BHD", symbol: "BD", name: "Bahraini Dinar" },
];
