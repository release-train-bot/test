import * as React from 'react';
import {Link, Stack} from '@mui/material';
import AppToggleThemeBlock from "@/components/AppToggleThemeBlock";

export default function Page() {
  return (
    <Stack
      sx={{width: '400px', m: 10}}
      direction="column"
      spacing={2}>
      <Link>{process.env.GITHUB_RELEASE_URL || 'release url'}</Link>
      <AppToggleThemeBlock/>
    </Stack>
  );
}
