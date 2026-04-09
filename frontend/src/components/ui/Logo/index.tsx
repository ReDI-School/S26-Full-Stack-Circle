
import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'full' | 'compact';
}

export function Logo({ className = '', size = 'full' }: LogoProps) {
  const isFull = size === 'full';
  //const isFull = size === 'compact';

  if (isFull) {
    // FULL VERSION
    return (
      <div className={`inline-flex items-center ${className}`}>
        <div
          className="border border-dashed dark:border-white px-8 py-6"
          style={{
            borderColor: 'var(--color-logo-border)',
            width: '311px',
            height: '182px',
            borderWidth: '1px',
            borderRadius: '5px',
          }}
        >
          <div className="flex justify-center mb-3">
            <Image
                src="/images/logo.svg"
                alt="Logo"
                width={259}
                height={29}
                priority
            />
          </div>
          <div
            className="font-black mt-6 mb-3 whitespace-nowrap"
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
          <div className="mt-6">
            <Image
                src="/images/logo-compact.svg"
                alt="R.E."
                width={74}
                height={29}
                priority />
          </div>
        </div>
      </div>
    );
  }

  // COMPACT VERSION (mobile)
  return (
    <div className={`inline-flex items-center ${className}`}>
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