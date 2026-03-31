import Link from 'next/link';
import { Header } from '@/components/Header';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-terminal-bg">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-terminal-muted mb-8">
            Page not found
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/" 
              className="bg-terminal-surface text-terminal-text px-6 py-3 rounded-lg hover:bg-terminal-surface/70 transition"
            >
              Go Home
            </Link>
            <Link 
              href="/learn" 
              className="bg-terminal-prompt text-white px-6 py-3 rounded-lg hover:bg-terminal-prompt/90 transition"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
