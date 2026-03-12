export default function PublicPagesLayout({ children }: { children: React.ReactNode }) {
  // This layout is for pages that should NOT inherit the main site's navigation/footer,
  // but still exist within the root <html> and <body> provided by src/app/layout.tsx.
  // We apply a specific background color directly if needed, or it can be done in globals.css for these routes.
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
