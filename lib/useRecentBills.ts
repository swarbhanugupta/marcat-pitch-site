"use client";

import { useEffect, useState } from "react";
import { fetchRecentBills, type RecentBill } from "./pitchBills";

export const BILLS_POLL_MS = 20_000;

export function useRecentBills(): RecentBill[] {
  const [bills, setBills] = useState<RecentBill[]>([]);
  useEffect(() => {
    let active = true;
    const pull = () => fetchRecentBills().then((b) => { if (active) setBills(b); });
    pull();
    const id = setInterval(pull, BILLS_POLL_MS);
    return () => { active = false; clearInterval(id); };
  }, []);
  return bills;
}
