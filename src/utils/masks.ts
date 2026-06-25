export const formatCurrency = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const formatDate = (iso?: string | Date) => (iso ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(iso)) : "—");


export const maskPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
};
export const formatarWhatsapp = (value: string) => {
  const limpo = value.replace(/\D/g, "");
  if (limpo.length <= 2) return limpo;
  if (limpo.length <= 7) return `(${limpo.slice(0, 2)}) ${limpo.slice(2)}`;
  return `(${limpo.slice(0, 2)}) ${limpo.slice(2, 7)}-${limpo.slice(7, 11)}`;
};

export const formatarDocumento = (value: string) => {
  const limpo = value.replace(/\D/g, "");
  if (limpo.length <= 11) {
    return limpo
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return limpo
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
};
