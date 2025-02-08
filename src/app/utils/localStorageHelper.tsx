/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export const getDataLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const setDataLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
