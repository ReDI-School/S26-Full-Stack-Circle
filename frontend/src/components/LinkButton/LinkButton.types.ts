import React from 'react';
import { AnchorHTMLAttributes } from 'react';

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  icon?: React.ReactNode;
  href?: string;
}
