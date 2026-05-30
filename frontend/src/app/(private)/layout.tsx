const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <h1>Private Area</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default PrivateLayout;
