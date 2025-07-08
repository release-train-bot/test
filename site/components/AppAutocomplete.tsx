'use client';

import {Autocomplete, Box, TextField, Typography} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {KeyboardArrowDown} from '@mui/icons-material';
import {useTranslations} from 'next-intl';

export interface AppAutocompleteProps<T> {
  getOptions: (inputValue: string) => Promise<T[] | null | undefined>;
  onStartIconClick?: (option: T | null) => void;
  getOptionKey: (option: T | null) => string | number;
  getOptionCaption?: (option: T | null) => string;
  getOptionLabel: (option: T | null) => string;
  onChange: (value: T | null) => void;
  startIcon?: React.ReactNode;
  placeholderText?: string | null;
  noOptionsText?: string | null;
  loadingText?: string | null;
  dynamicOptions?: boolean;
  height?: string | null;
  disabled?: boolean;
  noBorder?: boolean;
  value: T | null;
  bottomSection?: React.ReactNode;
}

export function AppAutocomplete<T>(
  {
    value,
    onChange,
    getOptions,
    getOptionKey,
    getOptionLabel,
    height = null,
    noBorder = false,
    getOptionCaption,
    disabled = false,
    startIcon = null,
    dynamicOptions = true,
    onStartIconClick = undefined,
    placeholderText = null,
    noOptionsText = null,
    loadingText = null,
    bottomSection = null,
  }: AppAutocompleteProps<T>
) {
  const t = useTranslations('components.AppAutocomplete');
  const placeholderTextValue = placeholderText || t('placeholder');
  const noOptionsTextValue = noOptionsText || t('noOptions');
  const loadingTextValue = loadingText || t('loading');
  const [options, setOptions] = useState<(T | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const loaded = useRef(false);

  const loadOptions = useRef(async (
    getOptions: (inputValue: string) => Promise<T[] | null | undefined>,
    currentInputValue: string
  ) => {
    if (!dynamicOptions && loaded.current) return;
    try {
      setLoading(true);
      const result = (await getOptions(currentInputValue)) || [];
      setOptions(bottomSection ? [...result, null] : result);
      loaded.current = result.length > 0;
    } catch (error) {
      setOptions(bottomSection ? [null] : []);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (open) {
      loadOptions.current(getOptions, inputValue);
    }
  }, [open, inputValue, getOptions]);

  return (
    <Autocomplete<T | null, boolean, boolean>
      sx={{position: 'relative'}}
      fullWidth
      slotProps={{
        listbox: {
          sx: {
            '& li#bottom': {
              position: 'sticky',
              borderTop: 1,
              padding: 0,
              bottom: -8,
              zIndex: 1
            }
          }
        },
        popupIndicator: {
          sx: {
            border: '0',
            height: '24px'
          }
        },
        paper: {
          elevation: 4
        }
      }}
      value={value}
      disableClearable
      loading={loading}
      options={options}
      disabled={disabled}
      inputValue={inputValue}
      getOptionKey={getOptionKey}
      loadingText={loadingTextValue}
      noOptionsText={noOptionsTextValue}
      getOptionLabel={getOptionLabel}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={(_, newValue) => setInputValue(newValue)}
      onChange={(_, newValue) => onChange(newValue as T)}
      isOptionEqualToValue={(option, value) => getOptionKey(option) === getOptionKey(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholderTextValue}
          {...(noBorder ? {
            sx: {
              '& .MuiInputBase-root': {
                border: 'none'
              },
            }
          } : {})}
          slotProps={{
            input: {
              ...params.InputProps,
              sx: {height: height, background: 'transparent'},
              startAdornment: startIcon ? (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline-position',
                      cursor: onStartIconClick ? 'pointer' : 'default',
                      color: 'primary.main',
                      mx: 1
                    }}
                    onClick={() => value && onStartIconClick && onStartIconClick(value)}
                  >
                    {startIcon}
                  </Box>
                  {params.InputProps.startAdornment}
                </>
              ) : params.InputProps.startAdornment
            }
          }}
        />
      )}
      renderOption={((props, option: T | null, state) => {
        if (bottomSection && !option && state.index === options.length - 1) {
          return <li {...props} id="bottom" key="bottom">{bottomSection}</li>;
        }
        return <li {...props} key={getOptionKey(option)}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: onStartIconClick ? 'pointer' : 'default',
            color: 'text.secondary',
            paddingY: '16px',
            width: '100%',
            gap: 2
          }}>
            <span onClick={() => {
              onStartIconClick && onStartIconClick(option)
            }}>{startIcon}</span>
            <Box>
              <Typography variant="body1" color="text.primary">{getOptionLabel(option)}</Typography>
              {getOptionCaption && (
                <Typography variant="caption" color="text.secondary">
                  {getOptionCaption(option)}
                </Typography>
              )}
            </Box>
          </Box>
        </li>
      })}
      popupIcon={<KeyboardArrowDown sx={{color: 'text.secondary'}}/>}
    />
  );
}
