import './globals.css'

export const metadata = {
  title: 'Trip Architect',
  description: 'Personalize your trip with Trip Architect',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
