'use client';

export default function ERPDesignPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h1 className="text-xl font-bold text-[#ffcc00]">
          ERP Design Preview
        </h1>

        <a
          href="/erp/index.html"
          target="_blank"
          className="px-4 py-2 bg-[#ffcc00] text-black rounded-md font-bold"
        >
          Open Full Screen
        </a>
      </div>

      {/* IFRAME */}
      <iframe
        src="/erp/index.html"
        className="w-full h-[calc(100vh-80px)] border-0"
      />
    </div>
  );
}