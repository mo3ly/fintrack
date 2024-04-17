"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });
import { ACTIONS, EVENTS, STATUS } from "react-joyride";

const JoyrideTour = () => {
  const [tourCompleted, setTourCompleted, removeTourCompleted] =
    useLocalStorage("tourCompleted", false);

  const [run, setRun] = useState(false);

  const steps = [
    {
      target: ".tour-step-1",
      content: "Navigate between pages!",
    },
    {
      target: ".tour-step-mobile-1",
      content: "Navigate between pages!",
    },
    {
      target: ".tour-step-2",
      content: "Here is your summary!",
    },
    {
      target: ".tour-step-3",
      content: "Create a new caregory, then a transaction!",
    },
  ];

  useEffect(() => {
    if (!tourCompleted) {
      const timer = setTimeout(() => {
        setRun(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [tourCompleted]);

  const handleCallback = (data: any) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setTourCompleted(true);
    }
  };

  return (
    <JoyRideNoSSR
      continuous
      run={run}
      steps={steps}
      callback={handleCallback}
      styles={{
        options: {
          arrowColor: "#e3ffeb",
          backgroundColor: "#e3ffeb",
          // overlayColor: "rgba(79, 26, 0, 0.4)",
          primaryColor: "#000",
          textColor: "#004a14",
          zIndex: 1000,
        },
      }}
    />
  );
};

export default JoyrideTour;
