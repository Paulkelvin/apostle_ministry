export const metadata = {
  title: 'Sanity Studio | The Apostles Ministry',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="sanity-studio-wrapper" style={{ height: '100vh' }}>
      {children}
    </div>
  )
}
