// Server Component
import { Suspense } from 'react';
import { artworks } from '@/data/artworks';
import ArtworkDetail from './ArtworkDetail';

export default function ArtworkPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>}>
      <ArtworkPageContent id={params.id} />
    </Suspense>
  );
}

async function ArtworkPageContent({ id }: { id: string }) {
  // This is a server component that can safely use async/await
  // We can do server-side validation here
  const artwork = artworks.find(art => art.id === id);
  
  if (!artwork) {
    return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Artwork not found</h1>
      <a href="/artworks" className="mt-4 inline-block text-sm font-medium text-gray-700 hover:text-gray-900">
        Return to artworks
      </a>
    </div>;
  }
  
  // Pass the ID to the client component
  return <ArtworkDetail artworkId={id} />;
}
