/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import dayjs, { UnitType } from "dayjs";
import "dayjs/locale/ca";
import "dayjs/locale/en";
import "dayjs/locale/es";
import "dayjs/locale/pl";
import calendar from "dayjs/plugin/calendar";
import duration from "dayjs/plugin/duration";
import localeData from "dayjs/plugin/localeData";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import i18next from "i18next";

import { IMediaTimestampModel } from "models";

import { CalendarTime } from "../constants/calendarTimePluginLocale";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(calendar);

interface LanguageMap {
  [key: string]: string;
}

const LOCALE_MAP: LanguageMap = {
  pl: "pl",
  ca: "ca",
  cat: "ca",
  spa: "es",
  esp: "es",
  eng: "en",
  en: "en",
};

export class TimeHelper {
  static getCurrentDate() {
    return dayjs();
  }

  static getCurrentYear() {
    return dayjs().year();
  }

  static createDate(value: Date | number | string, utc = false) {
    return utc ? dayjs(value).tz("utc") : dayjs(value);
  }

  static getCurrentDateTime(): Date {
    return dayjs().toDate();
  }

  public static parse(value: Date | number | string) {
    return dayjs(value);
  }

  static replaceTime(
    base: Date | number | string,
    time: Date | number | string
  ): Date {
    const timeDate = dayjs(time);

    return dayjs(base)
      .hour(timeDate.hour())
      .minute(timeDate.minute())
      .second(timeDate.second())
      .millisecond(timeDate.millisecond())
      .toDate();
  }

  static getStartOfToday(): Date {
    return dayjs().startOf("day").toDate();
  }

  static getStartOfDay(value: Date | number | string): Date {
    return dayjs(value).startOf("day").toDate();
  }

  static getCurrentDateKey(format = "YYYY-MM-DD") {
    return dayjs().format(format);
  }

  static getDateKey(value: Date | number | string) {
    return dayjs(value).format("DD/MM/YYYY");
  }

  static parseValueFromDate(
    value: Date | number | string,
    formatDate: string
  ): number {
    return +dayjs(value).format(formatDate);
  }

  static getDate(value: Date | number | string): Date {
    const date = dayjs(value);

    return new Date(Date.UTC(date.year(), date.month(), date.date()));
  }

  static getMonths() {
    dayjs.extend(localeData);

    return dayjs.months();
  }

  static getDaysInMonth(date: string) {
    return dayjs(date).daysInMonth();
  }

  static getDateTime(value: Date | number | string): Date {
    const date = dayjs(value);

    return date.toDate();
  }

  static getTimestamp(value: Date | number | string): number {
    const date = dayjs(value);

    return date.unix();
  }

  static getDateWithOffset(
    value: Date | number | string,
    offset: number,
    offsetUnit: dayjs.OpUnitType
  ): Date {
    const date = dayjs(value).add(offset, offsetUnit);

    return date.toDate();
  }

  static getTimeToCurrent(value: Date | number | string): string {
    return dayjs().to(value);
  }

  static format(
    value: Date | number | string,
    stringWithTokens: string,
    language?: string
  ): string {
    dayjs.extend(updateLocale);
    dayjs.updateLocale("ca", {
      months: [
        "gener",
        "febrer",
        "març",
        "abril",
        "maig",
        "juny",
        "juliol",
        "agost",
        "setembre",
        "octubre",
        "novembre",
        "desembre",
      ],
      monthsShort: [
        "gen.",
        "febr.",
        "març",
        "abr.",
        "maig",
        "juny",
        "jul.",
        "ag.",
        "set.",
        "oct.",
        "nov.",
        "des.",
      ],
    });

    return (
      language ? dayjs(value).locale(this.mapLocale(language)) : dayjs(value)
    ).format(stringWithTokens);
  }

  static diff(
    value1: Date | number | string,
    value2: Date | number | string,
    unit: dayjs.QUnitType = "day"
  ): number {
    const date1 = dayjs(value1);
    const date2 = dayjs(value2);

    return date1.diff(date2, unit);
  }

  public static isAfter(
    date: string | number | Date | dayjs.Dayjs | null | undefined,
    unit?: UnitType
  ) {
    return dayjs().isAfter(date, unit);
  }

  static isBefore(
    date: Date | number | string,
    compareTo: Date | number | string,
    unit: dayjs.OpUnitType = "millisecond"
  ): boolean {
    const date1 = dayjs(date);
    const date2 = dayjs(compareTo);

    return date1.isBefore(date2, unit);
  }

  static isBeforeCurrent(
    value: Date | number | string | null | undefined
  ): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    const date1 = dayjs(value);
    const date2 = dayjs();

    return date1.isBefore(date2);
  }

  static isAfterCurrent(
    value: Date | number | string | null | undefined
  ): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    const date1 = dayjs(value);
    const date2 = dayjs();

    return date1.isAfter(date2);
  }

  static compare(
    value1: Date | number | string,
    value2: Date | number | string
  ): number {
    const date1 = dayjs(value1);
    const date2 = dayjs(value2);

    return date1.isBefore(date2) ? -1 : date1.isSame(date2) ? 0 : 1;
  }

  static toISOString(value: Date | number | string) {
    return dayjs(value).toJSON();
  }

  static isBetween(
    compareDate: Date | number | string,
    startDate?: Date | number | string,
    endDate?: Date | number | string
  ): boolean {
    const compare = dayjs(compareDate);
    const start = startDate ? dayjs(startDate) : undefined;
    const end = endDate ? dayjs(endDate) : undefined;

    if (start && end) {
      return start.isBefore(compare) && end.isAfter(compare);
    } else {
      return (start?.isBefore(compare) || end?.isAfter(compare)) ?? false;
    }
  }

  static isCurrentBetween(
    value1: Date | number | string | undefined,
    value2: Date | number | string | undefined
  ): boolean {
    const currentDateTime = dayjs();

    if (!value1) {
      return false;
    }

    const date1 = dayjs(value1);

    if (!value2) {
      return date1.isBefore(currentDateTime);
    }

    const date2 = dayjs(value2);

    return date1.isBefore(currentDateTime) && date2.isAfter(currentDateTime);
  }

  static pad(value: number, size: number) {
    return ("000" + value).slice(size * -1);
  }

  static formatDuration(miliseconds: number | undefined) {
    let durationText = "";

    if (miliseconds) {
      const hours = miliseconds / (60 * 60 * 1000);
      const rhours = Math.floor(miliseconds / (60 * 60 * 1000));
      const minutes = (hours - rhours) * 60;
      const rminutes = Math.round(minutes);

      if (rhours) {
        durationText += `${rhours}h `;
      }

      if (rminutes) {
        durationText += `${rminutes}min`;
      }
    }

    return durationText;
  }

  static formatDurationMilliseconds(
    duration: number | undefined,
    format: "HH:mm" | "HH:mm:ss" | "(HH):mm:ss" | "HH:mm:ss,ms" = "HH:mm"
  ): string | undefined {
    let result: string | undefined = undefined;

    if (duration) {
      const seconds = Math.floor((duration / 1000) % 60);
      const minutes = Math.floor((duration / (1000 * 60)) % 60);
      const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      const milliseconds = +parseFloat(`${duration}`).toFixed(3).slice(-3);

      switch (format) {
        case "HH:mm":
          result = `${this.pad(hours, 2)}:${this.pad(minutes, 2)}`;
          break;
        case "HH:mm:ss":
          result = `${this.pad(hours, 2)}:${this.pad(minutes, 2)}:${this.pad(
            seconds,
            2
          )}`;
          break;
        case "(HH):mm:ss":
          if (hours === 0) {
            result = `${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`;
          } else {
            result = `${this.pad(hours, 2)}:${this.pad(minutes, 2)}:${this.pad(
              seconds,
              2
            )}`;
          }
          break;
        case "HH:mm:ss,ms":
          result = `${this.pad(hours, 2)}:${this.pad(minutes, 2)}:${this.pad(
            seconds,
            2
          )},${this.pad(milliseconds, 3)}`;
          break;
      }
    }

    return result;
  }

  static formatFromTo(duration: number | undefined) {
    let durationText = "";

    if (duration) {
      const hours = duration / (60 * 60 * 1000);
      const rhours = Math.floor(duration / (60 * 60 * 1000));
      const minutes = (hours - rhours) * 60;
      const rminutes = Math.round(minutes);
      const seconds = (minutes - rminutes) * 60;
      const rseconds = Math.round(seconds);

      if (rhours) {
        durationText += `${rhours}h `;
      }

      if (rminutes) {
        durationText += `${rminutes}min `;
      }

      if (rseconds && !rminutes) {
        durationText += `${rseconds}s`;
      }
    }

    return durationText;
  }

  static formatDurationSeconds(
    duration: number | undefined,
    format: "HH:mm" | "HH:mm:ss" | "(HH):mm:ss" | "HH:mm:ss,ms" = "HH:mm"
  ): string | undefined {
    let result: string | undefined = undefined;

    if (duration) {
      const hours = Math.floor(duration / 60 / 60);
      const minutes = Math.floor(duration / 60) % 60;
      const seconds = Math.floor(duration - hours * 60 * 60 - minutes * 60);
      const milliseconds = +parseFloat(`${duration}`).toFixed(3).slice(-3);

      switch (format) {
        case "HH:mm":
          result = `${this.pad(hours, 2)}:${this.pad(minutes, 2)}`;
          break;
        case "HH:mm:ss":
          result = `${this.pad(hours, 2)}:${this.pad(minutes, 2)}:${this.pad(
            seconds,
            2
          )}`;
          break;
        case "(HH):mm:ss":
          if (hours === 0) {
            result = `${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`;
          } else {
            result = `${this.pad(hours, 2)}:${this.pad(minutes, 2)}:${this.pad(
              seconds,
              2
            )}`;
          }
          break;
        case "HH:mm:ss,ms":
          result = `${this.pad(hours, 2)}:${this.pad(minutes, 2)}:${this.pad(
            seconds,
            2
          )},${this.pad(milliseconds, 3)}`;
          break;
      }
    }

    return result;
  }

  static formatAvailabilityDate(
    availableFrom: Date | string,
    availableTo?: Date | string,
    shortened?: boolean
  ) {
    const from = dayjs(availableFrom);
    const template = shortened
      ? "ddd | DD MMM | HH:mm"
      : "dddd | DD MMM | HH:mm";

    let formattedDate = from.format(template);
    if (availableTo) {
      const to = dayjs(availableTo);
      formattedDate += to.format(" - HH:mm");
    }
    return formattedDate;
  }

  static formatAvailabilityFrom(availableFrom: Date | string) {
    const template = "DD MMM YYYY";
    const language = localStorage.getItem("i18nextLng") || undefined;

    return this.format(availableFrom, template, language);
  }

  public static formatRelativeDateInRange(
    beforeDatePrefix: string,
    afterDatePrefix: string,
    startDate?: Date | string,
    endDate?: Date | string,
    lang?: string
  ) {
    try {
      let language = lang;
      if (typeof window !== "undefined") {
        language = window?.localStorage?.getItem("i18nextLng");
      }

      const currentDatetime = language
        ? dayjs().locale(this.mapLocale(language))
        : dayjs();
      if (startDate && currentDatetime.isBefore(dayjs(startDate))) {
        return `${beforeDatePrefix} ${currentDatetime.to(startDate)}`;
      } else if (endDate && currentDatetime.isAfter(dayjs(endDate))) {
        return `${afterDatePrefix} ${currentDatetime.to(endDate)}`;
      }
    } catch (err) {
      console.error("formatRelativeDateInRange Error:", err);
      return undefined;
    }
  }

  static formatCurrentTime(seconds: number) {
    const miliseconds = seconds > 0 ? seconds * 1000 : 0;
    const result = dayjs
      .utc(miliseconds)
      .format(seconds < 60 * 60 ? "m:ss" : "H:mm:ss");
    return result;
  }

  static getDuration(
    duration?: number,
    startTime?: Date | string,
    endTime?: Date | string
  ) {
    if (startTime && endTime) {
      const start = dayjs(startTime);
      const end = dayjs(endTime);
      const dur = dayjs.duration(end.diff(start));

      return dur.asSeconds();
    }

    return duration ?? 0;
  }

  static getCurrentDuration(startTime?: Date) {
    if (!startTime) {
      return 0;
    }

    const start = dayjs(startTime);
    const current = dayjs();

    if (current.isBefore(start)) {
      return 0;
    }

    const dur = dayjs.duration(current.diff(start));

    return dur.asSeconds();
  }

  static getTranslatedStartDate(
    data: Date | undefined,
    language: string,
    format?: string
  ) {
    if (!data) {
      return null;
    }

    const getFormat = format || "dddd h:mm";

    return dayjs(data).locale(this.mapLocale(language)).format(getFormat);
  }

  static getDateWithTranslation = (
    dateString: string | undefined
  ): string | undefined => {
    if (dateString && dateString.includes("#")) {
      const dateMark = dateString.split("#");
      const transKey = (key: string) => `${i18next.t(key)} ${dateMark[1]}`;

      switch (dateMark[0]) {
        case "Today":
          return transKey(`COMMON__TODAY`);
        case "Yesterday":
          return transKey("COMMON__YESTERDAY");
        case "Tomorrow":
          return transKey("COMMON__TOMORROW");
      }
    }
    return dateString;
  };

  /**
   * Foramt date, by using Calendar Time plugin
   * https://day.js.org/docs/en/display/calendar-time
   *
   * @param date Date to format.
   * @return Formated date, e.g. `Today, at 9:30 AM`, `Dzisiaj, 9:30`
   */
  static formatCalendarRelativeDate(date?: Date | string, epg?: boolean) {
    if (date) {
      return this.getDateWithTranslation(
        dayjs(date).calendar(
          undefined,
          epg ? CalendarTime.pl_PL_EPG : CalendarTime.pl_PL
        )
      );
    }
  }

  static getMonthName = (date: string | Date) => {
    const formatter = new Intl.DateTimeFormat("en", {
      month: "long",
    });
    return formatter.format(new Date(date));
  };

  static mapLocale = (language: string): string => {
    return LOCALE_MAP[language] || "en";
  };

  static formatTimestampToSeconds(timestamp: IMediaTimestampModel | undefined) {
    return (
      timestamp &&
      (timestamp.Hour ?? 0) * 3600 +
        (timestamp.Minute ?? 0) * 60 +
        (timestamp.Second ?? 0)
    );
  }

  static dateOfXDaysBefore(days = 7) {
    return dayjs().subtract(days, "day").format("YYYY-MM-DDTHH:mm:ssZ");
  }
}
