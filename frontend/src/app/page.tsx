"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Image as ImageIcon, CalendarCheck, Share2, Video } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#06060c] text-[#f0ede4] overflow-hidden">
      {/* Ambient Background */}
      <div className="orb" />
      <div className="orb" />
      <div className="orb" />
      <div className="grid-overlay" />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl border-b border-[#222238]/60 bg-[#06060c]/80 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a843] to-[#b0882a] flex items-center justify-center shadow-lg shadow-[#d4a843]/20">
            <Sparkles className="text-[#06060c] w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight font-display">
            AI Event Studio
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#a8a498]">
          <Link href="#features" className="hover:text-[#d4a843] transition-colors">Features</Link>
          <Link href="#templates" className="hover:text-[#d4a843] transition-colors">Templates</Link>
          <Link href="#pricing" className="hover:text-[#d4a843] transition-colors">Pricing</Link>
        </div>
        <div>
          <Button className="bg-[#12121f] text-[#f0ede4] border border-[#222238] hover:bg-[#222238] rounded-xl px-5">
            Login
          </Button>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-24 text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4a843]/30 bg-[#d4a843]/10 text-[#d4a843] text-xs font-bold uppercase tracking-wider mb-8">
            <Sparkles className="w-4 h-4" />
            <span>The Future of Event Planning</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-display mb-8 leading-tight">
            Create Stunning Event Invitations <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a843] to-[#e8c96e]">
              with AI
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#a8a498] mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Generate exquisite invitation cards, social media assets, video invitations, and smart RSVP pages in seconds from a simple natural language prompt.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/create">
              <Button size="lg" className="bg-gradient-to-r from-[#d4a843] to-[#b0882a] text-[#06060c] font-bold rounded-2xl px-8 h-14 text-lg hover:opacity-90 transition-all shadow-xl shadow-[#d4a843]/20">
                Generate Invitation <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="rounded-2xl px-8 h-14 text-lg border-[#222238] bg-[#12121f]/50 backdrop-blur-md hover:bg-[#222238]">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-32 max-w-6xl mx-auto"
        >
          {[
            { icon: <ImageIcon className="w-6 h-6 text-[#d4a843]" />, title: "Smart Generation", desc: "Cards, PDFs & Posters" },
            { icon: <Video className="w-6 h-6 text-[#d4a843]" />, title: "Video Invites", desc: "Animated reels & stories" },
            { icon: <Share2 className="w-6 h-6 text-[#d4a843]" />, title: "Social Assets", desc: "WhatsApp & Instagram" },
            { icon: <CalendarCheck className="w-6 h-6 text-[#d4a843]" />, title: "RSVP System", desc: "Track guests effortlessly" },
          ].map((feature, idx) => (
            <div key={idx} className="bg-[#12121f]/60 backdrop-blur-xl border border-[#222238] p-6 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#d4a843]/10 border border-[#d4a843]/20 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold font-display mb-2">{feature.title}</h3>
              <p className="text-sm text-[#a8a498]">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
