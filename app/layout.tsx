import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-900 text-white font-sans">
        <nav className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto flex gap-8 items-center">
            <Link href="/" className="font-bold text-blue-400 text-lg hover:opacity-80 transition">
              Início
            </Link>
            <div className="flex gap-6">
              <Link 
                href="/precos" 
                className="text-gray-300 hover:text-blue-400 transition font-medium"
              >
                Preços de Mercado
              </Link>
              <Link 
                href="/designer-workshop" 
                className="text-gray-300 hover:text-blue-400 transition font-medium"
              >
                Designer Workshop
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}