import React from 'react';
import Image from 'next/image';
import {
  logoStyles,
  dashedBorderStyles,
  fullLogoContainerStyles,
  mainTextStyles,
} from './Logo.styles';

import Line1Svg from '../../assets/images/logo.svg';
import Line3Svg from '../../assets/images/logo-compact.svg';

export interface LogoProps {
  /**
   * Size variant of the logo
   * @default "full"
   */
  size?: 'full' | 'compact';
  /**
   * Optional additional CSS class
   */
  className?: string;
}

export function Logo({ className = '', size = 'full' }: LogoProps) {
  const isFull = size === 'full';

  if (isFull) {
    // FULL VERSION
    return (
      <div className={logoStyles({ size, className })} data-testid="logo-full">
        <div
          className={dashedBorderStyles({ size })}
          style={{
            borderColor: 'var(--color-logo-border)',
            width: '311px',
            height: '182px',
            borderWidth: '1px',
            borderRadius: '5px',
          }}
        >
          <div className={fullLogoContainerStyles()}>
            {/* Top SVG logo */}
            <div className="flex justify-center mb-3">
              <Image
                src={Line1Svg}
                alt="Logo"
                width={259}
                height={29}
                priority
              />
            </div>

            {/* Main text "REDI. EVENTS." */}
            <div
              className={mainTextStyles()}
              style={{
                width: '259px',
                height: '29px',
                color: 'var(--color-grey-redi)',
                fontSize: '39px',
                lineHeight: '29px',
                letterSpacing: '-0.02em',
                paddingLeft: 0,
              }}
            >
              REDI. EVENTS.
            </div>

            {/* Bottom compact SVG */}
            <div className="mt-4">
              <Image
                src={Line3Svg}
                alt="R.E."
                width={74}
                height={29}
                priority />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // COMPACT VERSION (mobile)
  return (
    <div className={logoStyles({ size, className })} data-testid="logo-compact">
      <Image
        src="/images/logo-compact.svg"
        alt="R.E."
        width={74}
        height={29}
        className="ml-4"
        priority
      />
    </div>
  );
}
