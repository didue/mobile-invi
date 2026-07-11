"use client";

import { useEffect, useRef, useState } from "react";
import { subscribeToast } from "@/lib/toast";

const TOAST_DURATION_MS = 1800;

export const Toast = () => {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return subscribeToast((nextMessage) => {
      setMessage(nextMessage);
      setShow(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShow(false), TOAST_DURATION_MS);
    });
  }, []);

  return <div className={`toast${show ? " show" : ""}`}>{message}</div>;
};
