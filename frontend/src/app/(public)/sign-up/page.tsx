import Link from 'next/link';

const SignIn = () => {
  return (
    <div className="size-full grid grid-rows-[auto_1fr]">
      <div className="w-full flex justify-end gap-2 text-text-tertiary">
        Already have account?{' '}
        <Link
          href="/sign-in"
          className="text-primary hover:text-primary-dark underline underline-offset-3 transition-colors"
        >
          SIGN IN
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <h1>Sign Up</h1>
        <p>add your form here</p>
      </div>
    </div>
  );
};

export default SignIn;
