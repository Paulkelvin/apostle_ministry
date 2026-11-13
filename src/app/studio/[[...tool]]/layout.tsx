export const metadata = {
  title: 'Sanity Studio | Restoring Life Family Community Center',
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
