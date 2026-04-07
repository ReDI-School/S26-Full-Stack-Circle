import Image from 'next/image';
import Link from 'next/link';

import logo from '../assets/images/logo.svg';
import Button from '../components/Button/Button';
import { Logo } from '../components/ui/Logo';

const Home = () => {
  return (
    <div className="flex flex-col gap-10">
       <Logo/>
      <Image src={logo} alt="ReDi Events Logo" width={500} height={135} />
      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
    </div>
  );
};
export default Home;
