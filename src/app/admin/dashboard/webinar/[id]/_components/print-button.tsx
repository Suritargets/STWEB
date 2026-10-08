'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="ml-auto bg-[#2B3494] text-white text-sm px-5 py-2 rounded-md hover:opacity-90 transition-opacity"
    >
      Afdrukken / PDF
    </button>
  )
}
