'use client';

import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Box, CircularProgress} from '@mui/material';

export default function Page() {
  const [isLoaded, setLoaded] = useState(false);
  const onFrameReady = () => setLoaded(true);

  return (
    <>
      <FrameContent
        url="/compose/index.html"
        onReady={onFrameReady}
      />
      {!isLoaded && <Loader/>}
    </>
  );
}

type FrameContentProps = {
  url: string;
  onReady: Function;
};


function FrameContent({url, onReady}: FrameContentProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const canvas = frameRef.current?.contentDocument?.querySelector('canvas');
      if (canvas && (canvas.getContext('2d') || canvas.getContext('webgl') || canvas.getContext('webgl2'))) {
        clearInterval(intervalId);
        onReady();
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, [onReady]);

  return (
    <iframe
      src={url}
      ref={frameRef}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        position: 'fixed',
        background: 'inherit',
      }}
    />
  )
}

function Loader() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        background: 'inherit',
        justifyContent: 'center',
      }}
    >
      <CircularProgress/>
    </Box>
  )
}