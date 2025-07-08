import * as React from 'react';
import {Box} from '@mui/material';
import AppToggleThemeBlock from "@/components/AppToggleThemeBlock";

export default function Page() {
  return (
    <Box sx={{width: '400px', m: 10}}>
      <AppToggleThemeBlock/>
    </Box>
  );
}
