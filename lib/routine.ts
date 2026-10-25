"use client";
import { useState, useEffect, useCallback } from "react";

const KEY_ROUTINE = "dl_routine_state";
const KEY_REMOVED = "dl_routine_removed";

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function safeWrite(key: string, val: unknown) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* noop */ }
}

export function useRoutineState(stepIds: string[]) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [removed, setRemoved] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(safeRead<Record<string, boolean>>(KEY_ROUTINE, {}));
    setRemoved(safeRead<string[]>(KEY_REMOVED, []));
  }, []);

  const toggle = useCallback((id: string) => {
    setCompleted(prev => {
      const next = { ...prev, [id]: !prev[id] };
      safeWrite(KEY_ROUTINE, next);
      return next;
    });
  }, []);

  const removeStep = useCallback((id: string) => {
    setRemoved(prev => {
      const next = [...new Set([...prev, id])];
      safeWrite(KEY_REMOVED, next);
      return next;
    });
  }, []);

  const restoreStep = useCallback((id: string) => {
    setRemoved(prev => {
      const next = prev.filter(x => x !== id);
      safeWrite(KEY_REMOVED, next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCompleted({});
    setRemoved([]);
    safeWrite(KEY_ROUTINE, {});
    safeWrite(KEY_REMOVED, []);
  }, []);

  const active = stepIds.filter(id => !removed.includes(id));
  const doneCount = active.filter(id => completed[id]).length;
  const pct = active.length ? Math.round((doneCount / active.length) * 100) : 0;

  return { completed, removed, toggle, removeStep, restoreStep, reset, doneCount, total: active.length, pct };
}
