import * as React from 'react';
import {useTranslations} from 'next-intl';
import LightModeIcon from '@mui/icons-material/LightMode';
import {styled, useColorScheme} from '@mui/material/styles';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import {AppHeader} from "@/components/AppText";
import Stack from "@mui/material/Stack";

const IconToggleButton = styled(ToggleButton)({
  justifyContent: 'center',
  display: 'flex',
  height: '36px',
  width: '100%',
  '& > *': {
    marginRight: '8px',
  },
});

export default function AppToggleThemeBlock() {
  const {setMode, mode} = useColorScheme();

  const t = useTranslations('components.AppToggleThemeBlock');

  const onChange = React.useCallback(
    (_event: React.MouseEvent<HTMLElement>, value: string) => {
      _event.preventDefault();
      setMode(value as 'light' | 'dark' | 'system');
    },
    [setMode],
  );

  return (
    <Stack>
      <AppHeader>{t('title')}</AppHeader>
      <ToggleButtonGroup
        exclusive
        value={mode}
        color="primary"
        onChange={onChange}
        style={{
          boxShadow: 'none',
        }}
        sx={{
          boxShadow: 'none',
          elevation: 0,
        }}
        fullWidth
      >
        <IconToggleButton value="light">
          <LightModeIcon fontSize="small"/>
          {t('light')}
        </IconToggleButton>
        <IconToggleButton value="system">
          <SettingsBrightnessIcon fontSize="small"/>
          {t('system')}
        </IconToggleButton>
        <IconToggleButton value="dark">
          <DarkModeOutlinedIcon fontSize="small"/>
          {t('dark')}
        </IconToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}