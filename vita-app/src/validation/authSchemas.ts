export function isValidEmail(value: string) {
  const email = value.trim();
  return email.length <= 100 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidDate(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 8) return false;
  const day = Number(digits.slice(0, 2));
  const month = Number(digits.slice(2, 4));
  const year = Number(digits.slice(4, 8));
  if (month < 1 || month > 12) return false;
  if (year < 1900) return false;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (day < 1 || day > daysInMonth) return false;
  return new Date(year, month - 1, day) <= new Date();
}

export function isValidCNPJ(value: string) {
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly.length === 14;
}

export function isValidPhone(value: string) {
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly.length === 10 || digitsOnly.length === 11;
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function formatCNPJ(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

export function formatDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function toISODate(displayValue: string) {
  const digits = displayValue.replace(/\D/g, "");
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  return `${year}-${month}-${day}`;
}
export function isValidName(value: string) {
  const name = value.trim();
  return name.length > 0 && name.length <= 100 && !/[^a-zA-ZÀ-ÿ\s]/.test(name);
}

export function isValidAddress(value: string) {
  const address = value.trim();
  return address.length <= 255 && !/[^a-zA-ZÀ-ÿ0-9\s]/.test(address);
}

export function isValidSchoolOrCourse(value: string) {
  const text = value.trim();
  return text.length <= 100 && !/[^a-zA-ZÀ-ÿ\s]/.test(text);
}

export function getPasswordError(value: string): string | null {
  if (value.length < 8) return "A senha deve ter no minimo 8 caracteres.";
  if (!/[A-Z]/.test(value)) return "A senha deve ter ao menos uma letra maiuscula.";
  if (!/[0-9]/.test(value)) return "A senha deve ter ao menos um numero.";
  if (!/[^a-zA-Z0-9]/.test(value)) return "A senha deve ter ao menos um caractere especial.";
  return null;
}
