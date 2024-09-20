import LoginValidator from "@/hooks/loginValidate";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoginValidator />
      {children}
    </>
  );
}
