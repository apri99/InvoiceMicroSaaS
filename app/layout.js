import './globals.css'
export const metadata = { title: 'Quick Invoice', description: 'Buat invoice cepat' }
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
