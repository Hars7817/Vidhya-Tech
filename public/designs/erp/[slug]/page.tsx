'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function DesignPreview() {
  const params = useParams();

  return (
    <div className="w-full h-screen bg-black">

      {/* BACK BUTTON */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/design"
          className="px-4 py-2 bg-[#ffcc00] text-black font-bold rounded-lg"
        >
          ← Back
        </Link>
      </div>

      {/* IFRAME */}
      <iframe
        src={`/designs/${params.slug}/index.html`}
        className="w-full h-full border-0"
      />

    </div>
  );
}