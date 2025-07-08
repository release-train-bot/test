import * as React from 'react';
import {theme} from "@/styles/theme";
import {getLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import {DevTools} from "@/features/common/presentation/DevTools";
import {InitColorSchemeScript, ThemeProvider} from "@mui/material";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';

export const metadata = {
  title: 'App',
  description: 'app'
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
    <body>
    <InitColorSchemeScript attribute="data"/>
    <NextIntlClientProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          {props.children}
          <DevTools/>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
