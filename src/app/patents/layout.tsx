export default function PatentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="patents-layout">
      {children}
    </div>
  );
} 