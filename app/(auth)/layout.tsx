// app/login/layout.tsx
export default function AuthLayout({ children }:
  { children: React.ReactNode }) {
  return (
    <div className="h-screen flex relative">
      {children}
    </div>
  );
}
