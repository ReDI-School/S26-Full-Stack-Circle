import Link from 'next/link';
import { SignUpForm } from '@components';

const SignUp = () => {
  return (
    <div className="relative size-full flex-1 flex flex-col-reverse md:flex-col gap-8 items-center justify-center">
      <div className="md:absolute top-0 right-0 :w-full flex gap-2 text-text-tertiary items-center justify-center md:justify-end">
        Already have account?{' '}
        <Link
          href="/sign-in"
          className="text-primary hover:text-primary-dark underline underline-offset-3 transition-colors"
        >
          SIGN IN
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
