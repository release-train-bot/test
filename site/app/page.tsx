'use client';

import * as React from 'react';
import {Link, Stack} from '@mui/material';
import AppToggleThemeBlock from "@/components/AppToggleThemeBlock";

export default function Page() {
  const url = process.env.GITHUB_RELEASE_URL || 'release url'

  return (
    <Stack
      sx={{m: 8}}
      spacing={8}
      direction='column'
    >
      <AppToggleThemeBlock/>
      <Link href={url}>{url}</Link>
      <Link href='/client'>Client</Link>
    </Stack>
  );
}
