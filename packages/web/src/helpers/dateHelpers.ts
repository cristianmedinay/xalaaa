/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
const langToLocale = (lang: string) => {
  if (lang === "eng" || lang === "en") {
    return "en-US";
  }

  if (lang === "spa" || lang === "es" || lang === "esp") {
    return "es-ES";
  }

  return "ca-ES";
};

export function translateTime({
  date,
  language,
}: {
  date: Date;
  language: string;
}): string {
  const locale = langToLocale(language);

  const dateTimeFormat = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
  });

  return `${dateTimeFormat.format(date)} | ${getTime(date)}h`;
}

export function translateDate({
  date,
  language,
}: {
  date?: Date;
  language?: string;
}): string {
  if (!language || !date) {
    return "";
  }
  const locale = langToLocale(language);

  const dateTimeFormat = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
  });

  return dateTimeFormat.format(date);
}

export function getTime(date: Date): string {
  const HH = date.getHours();
  const M = date.getMinutes();
  const MM = M < 10 ? `0${M}` : M.toString();

  if (M === 0) {
    return `${HH}`;
  }

  return `${HH}.${MM}`;
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  );
}

export function isYesterday(date: Date): boolean {
  const d = new Date();
  d.setDate(d.getDate() - 1);

  return (
    d.getDate() === date.getDate() &&
    d.getMonth() === date.getMonth() &&
    d.getFullYear() === date.getFullYear()
  );
}

export function isTomorrow(date: Date): boolean {
  const d = new Date();
  d.setDate(d.getDate() + 1);

  return (
    d.getDate() === date.getDate() &&
    d.getMonth() === date.getMonth() &&
    d.getFullYear() === date.getFullYear()
  );
}
