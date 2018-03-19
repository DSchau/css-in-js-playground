import { Key, ReactNode } from 'react';
import React from 'react';

declare module 'react' {
  export interface ReactPortal {
    key: Key | null;
    children: ReactNode;
  }
}
