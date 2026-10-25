"use client";

import { useState, useEffect, useCallback } from "react";

const WISHLIST_KEY = "dl_wishlist";
const COMPARE_KEY = "dl_compare";
const COMPARE_MAX = 3;

function safeRead(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function safeWrite(key: string, value: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable
  }
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(safeRead(WISHLIST_KEY));
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      safeWrite(WISHLIST_KEY, next);
      return next;
    });
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, has };
}

export function useCompareList() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(safeRead(COMPARE_KEY));
  }, []);

  const add = useCallback((id: string) => {
    setIds((prev) => {
      if (prev.includes(id) || prev.length >= COMPARE_MAX) return prev;
      const next = [...prev, id];
      safeWrite(COMPARE_KEY, next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.filter((x) => x !== id);
      safeWrite(COMPARE_KEY, next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setIds([]);
    safeWrite(COMPARE_KEY, []);
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, add, remove, has, clear, max: COMPARE_MAX };
}

export function useAssessmentResults() {
  const ASSESSMENT_KEY = "dl_assessment";

  const save = useCallback((data: Record<string, unknown>) => {
    safeWrite(ASSESSMENT_KEY, [JSON.stringify(data)] as unknown as string[]);
    if (typeof window !== "undefined") {
      localStorage.setItem(ASSESSMENT_KEY, JSON.stringify(data));
    }
  }, []);

  const load = useCallback((): Record<string, unknown> | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(ASSESSMENT_KEY);
      return raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
    } catch {
      return null;
    }
  }, []);

  const clear = useCallback(() => {
    if (typeof window !== "undefined") localStorage.removeItem(ASSESSMENT_KEY);
  }, []);

  return { save, load, clear };
}
