"use client";

import dayjs from "dayjs";

export const formatDate = (date: Date | string) => {
  return dayjs(date).format("MMM D, YYYY");
};

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("de-DE").format(num);
};

// export const formatAmount = (value: string | number) => {
//   const stringValue = String(value);
//   const numericValue = stringValue.replace(/\D/g, "");
//   return numericValue
//     ? new Intl.NumberFormat("en-US").format(Number(numericValue))
//     : "";
// };

export const formatAmount = (value: number | string) =>
  value ? new Intl.NumberFormat("en-US").format(Number(value)) : "";

export const parseNumber = (value: string) =>
  Number(value.replace(/\D/g, "")) || "";
