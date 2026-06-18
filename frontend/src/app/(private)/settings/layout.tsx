interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => (
  <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
    <div className="flex flex-col gap-8 w-full max-w-[400px]">
      <hgroup className="flex flex-col gap-2">
        <h2 className="text-3xl font-normal leading-12 text-text-primary">User Settings</h2>
        <p className="text-lg leading-6 text-text-secondary">Update your name and password.</p>
      </hgroup>
      {children}
    </div>
  </main>
);

export default SettingsLayout;
