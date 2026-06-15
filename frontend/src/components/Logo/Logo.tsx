import Image from 'next/image';
import Link from 'next/link';

import logoFull from '../../assets/images/logo.svg';
import logoCompact from '../../assets/images/logo-compact.svg';
import logoCompactWhiteText from '../../assets/images/logo-compact-white.svg';
import logoFullWhiteText from '../../assets/images/logo-full-white.svg';

import { LogoProps } from './Logo.types';

type LogoVariantsDictionary = {
  [key in Exclude<LogoProps['size'], undefined>]: {
    textColor: Record<Exclude<LogoProps['textColor'], undefined>, string>;
    width: number;
    height: number;
  };
}

const LOGO_VARIANTS_DICTIONARY: LogoVariantsDictionary = {
  full: {
    textColor: {
      default: logoFull as string,
      white: logoFullWhiteText as string,
    },
    width: 259,
    height: 29,
  },
  compact: {
    textColor: {
      default: logoCompact as string,
      white: logoCompactWhiteText as string,
    },
    width: 74,
    height: 29,
  },
};

const Logo = ({ size = 'full', textColor = 'default' }: LogoProps) => {
  return (
    <Link href="/" aria-label="Go to homepage">
      <Image
        src={LOGO_VARIANTS_DICTIONARY[size].textColor[textColor]}
        alt=""
        width={LOGO_VARIANTS_DICTIONARY[size].width}
        height={LOGO_VARIANTS_DICTIONARY[size].height}
        priority
      />
    </Link>
  );
};

export default Logo;
