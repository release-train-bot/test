import {Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

export const AppBreadcrumb = styled(Typography)(({theme}) => ({
  fontSize: theme.typography.pxToRem(20),
}));

export const AppHeader = styled(Typography)(({theme}) => ({
  margin: '0 0 16px',
  letterSpacing: '.1rem',
  textTransform: 'uppercase',
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(11),
  color: (theme.vars || theme).palette.text.secondary,
}));