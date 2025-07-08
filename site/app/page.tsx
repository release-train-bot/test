import * as React from 'react';
import {Link, Stack} from '@mui/material';
import AppToggleThemeBlock from "@/components/AppToggleThemeBlock";

export default function Page() {
    const url = process.env.GITHUB_RELEASE_URL || 'release url'

    return (
        <Stack
            sx={{width: '400px', m: 10}}
            direction="column"
            spacing={2}>
            <Link href={url}>{url}</Link>
            <AppToggleThemeBlock/>
        </Stack>
    );
}
