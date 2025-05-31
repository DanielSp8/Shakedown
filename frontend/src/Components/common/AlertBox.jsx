/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

export default function AlertBox({ alertOpen, setAlertOpen, message }) {
  useEffect(() => {
    if (!alertOpen) return;

    const timer = setTimeout(() => {
      setAlertOpen(false);
    }, 2000);

    return () => setTimeout(timer);
  }, [alertOpen, setAlertOpen]);

  return (
    <div className="d-flex justify-content-center mt-3 fs-4">{message}</div>
  );
}
