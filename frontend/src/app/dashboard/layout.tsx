import { Sparkles, LayoutDashboard, CalendarDays, ImageIcon, Layers } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#06060c] text-[#f0ede4] flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#222238] bg-[#0d0d18]/50 backdrop-blur-xl hidden md:flex flex-col">
        <div className="p-6 border-b border-[#222238]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a843] to-[#b0882a] flex items-center justify-center shadow-lg shadow-[#d4a843]/20">
              <Sparkles className="text-[#06060c] w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight font-display">
              Event Studio
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#d4a843]/10 text-[#d4a843] font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/dashboard/events" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#a8a498] hover:text-[#f0ede4] hover:bg-[#222238]/50 font-medium transition-colors">
            <CalendarDays className="w-5 h-5" />
            My Events
          </Link>
          <Link href="/dashboard/assets" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#a8a498] hover:text-[#f0ede4] hover:bg-[#222238]/50 font-medium transition-colors">
            <ImageIcon className="w-5 h-5" />
            Generated Assets
          </Link>
          <Link href="/dashboard/templates" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#a8a498] hover:text-[#f0ede4] hover:bg-[#222238]/50 font-medium transition-colors">
            <Layers className="w-5 h-5" />
            Saved Templates
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4a843]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="p-8 max-w-6xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
