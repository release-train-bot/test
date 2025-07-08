'use client';

import * as React from 'react';
import {QueryClient} from '@tanstack/react-query'
import {useQueryClient} from "../hook/useQueryClient";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export function DevTools() {
  const client: QueryClient = useQueryClient();

  return (<ReactQueryDevtools initialIsOpen={false} client={client}/>)
}