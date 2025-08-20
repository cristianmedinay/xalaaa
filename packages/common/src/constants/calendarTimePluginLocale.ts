/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

export const CalendarTime = {
  en_EN: {
    sameDay: "[Today at] h:mm A", // The same day ( Today at 2:30 AM )
    nextDay: "[Tomorrow,] h:mm A", // The next day ( Tomorrow at 2:30 AM )
    nextWeek: "[Next] dddd, h:mm A", // The next week ( Sunday at 2:30 AM )
    lastDay: "[Yesterday,] h:mm A", // The day before ( Yesterday at 2:30 AM )
    lastWeek: "[Last] dddd, h:mm A", // Last week ( Last Monday at 2:30 AM )
    sameElse: "DD/MM/YYYY", // Everything else ( 7/10/2011 )
  },

  pl_PL: {
    sameDay: "[Dzisiaj,] HH:mm",
    nextDay: "[Jutro,] HH:mm",
    nextWeek: "dddd, HH:mm",
    lastDay: "[Wczoraj,] HH:mm",
    lastWeek: "dddd, HH:mm",
    sameElse: "DD.MM.YYYY",
  },

  pl_PL_EPG: {
    sameDay: "[Dzisiaj,] dddd DD MMMM",
    nextDay: "[Jutro,] dddd DD MMMM",
    nextWeek: "dddd, DD MMMM",
    lastDay: "[Wczoraj,] dddd DD MMMM",
    lastWeek: "dddd, DD MMMM",
    sameElse: "dddd DD MMMM",
  },
};
