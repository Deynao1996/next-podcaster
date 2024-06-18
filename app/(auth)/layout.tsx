export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="overlay bg-auth-bg flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat">
      {children}
    </div>
  )
}
