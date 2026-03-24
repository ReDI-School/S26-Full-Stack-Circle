const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex place-content-center place-items-center">
      {children}
    </div>
  );
};

export default Layout;
