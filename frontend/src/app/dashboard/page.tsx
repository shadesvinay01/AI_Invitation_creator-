import { Button } from "@/components/ui/button";
import { Plus, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-[#f0ede4]">Welcome back</h1>
          <p className="text-[#a8a498] mt-1">Here is what's happening with your events.</p>
        </div>
        <Link href="/create">
          <Button className="bg-gradient-to-r from-[#d4a843] to-[#b0882a] text-[#06060c] font-bold rounded-xl px-6 h-11 hover:opacity-90 transition-all shadow-lg shadow-[#d4a843]/20">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Events", value: "3", icon: <Clock className="w-5 h-5 text-[#d4a843]" /> },
          { label: "RSVPs Received", value: "142", icon: <CheckCircle2 className="w-5 h-5 text-[#4ade80]" /> },
          { label: "Assets Generated", value: "28", icon: <SparklesIcon className="w-5 h-5 text-[#a78bfa]" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-[#12121f]/80 backdrop-blur-md border border-[#222238] rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-[#a8a498] text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-[#f0ede4]">{stat.value}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#222238]/50 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div className="bg-[#12121f]/80 backdrop-blur-md border border-[#222238] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-display">Recent Events</h2>
          <Button variant="outline" className="border-[#222238] text-[#a8a498] hover:text-[#f0ede4] hover:bg-[#222238]">
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {[
            { name: "Sarah's Royal Wedding", date: "Dec 20, 2026", status: "Active", rsvp: 84 },
            { name: "Emma's 1st Birthday", date: "Jan 15, 2027", status: "Draft", rsvp: 0 },
          ].map((event, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[#222238]/50 hover:border-[#d4a843]/30 transition-colors bg-[#06060c]/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#d4a843]/20 to-[#222238] flex items-center justify-center border border-[#d4a843]/20">
                  <span className="text-[#d4a843] font-bold">{event.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#f0ede4]">{event.name}</h3>
                  <p className="text-sm text-[#a8a498]">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center hidden sm:block">
                  <p className="text-xs text-[#a8a498] uppercase tracking-wider mb-1">RSVP</p>
                  <p className="font-semibold text-[#f0ede4]">{event.rsvp}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  event.status === 'Active' ? 'bg-[#4ade80]/10 text-[#4ade80]' : 'bg-[#222238] text-[#a8a498]'
                }`}>
                  {event.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  )
}
