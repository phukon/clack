export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" max-w-[calc(100%-20px)] ml-2 md:w-[calc(100%-50px)] bg-white md:ml-3 mb-10">
      {children}
    </main>
  );
}
