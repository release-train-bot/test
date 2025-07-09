'use client';

import * as React from 'react';
import {CircularProgress} from "@mui/material";
import {useEffect, useRef, useState} from 'react';

export default function Page() {
  const targetRef = useRef(null);
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    console.log('useEffect', document.getElementById('appTarget'));

    let canvas: any | null = targetRef.current;

    if (!canvas) return;

    const observer = new MutationObserver(() => {
      setShowProgress(false);
    });

    observer.observe(canvas, {attributes: true});

    return () => observer.disconnect();
  }, [targetRef]);

  return (
    <>
      {showProgress && (
        <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>)}
      <canvas id='appTarget'></canvas>
      <script src="/client/skiko.js" defer></script>
      <script src="/client/app.js" defer></script>
    </>
  );
}
