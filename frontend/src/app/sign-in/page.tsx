import Link from 'next/link';

import Button from '../../components/Button/Button';

const SignIn = () => {
  return (
    <div className="flex flex-col gap-10">
      <h1>Sign In</h1>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};

export default SignIn;
