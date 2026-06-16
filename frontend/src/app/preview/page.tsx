"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Download, Share2, ArrowLeft, Paintbrush, FileText, QrCode, Video, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { InvitationCard } from "@/components/InvitationCard";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function PreviewPage() {
  const [theme, setTheme] = useState("luxury_gold");
  const [eventData, setEventData] = useState<any>({
    title: "Sarah & James",
    subtitle: "Together with their families",
    date: "December 20th, 2026",
    venue: "The Grand Hotel, Delhi"
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('generatedEvent');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.theme_id) setTheme(parsed.theme_id);
      setEventData(parsed);
    }
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = `invitation-${eventData.title.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image', err);
      alert('Failed to generate image.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePDFDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 });
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [cardRef.current.offsetWidth, cardRef.current.offsetHeight]
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, cardRef.current.offsetWidth, cardRef.current.offsetHeight);
      pdf.save(`invitation-${eventData.title.replace(/\s+/g, '-')}.pdf`);
    } catch (err) {
      console.error('Failed to download PDF', err);
      alert('Failed to generate PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleWhatsAppShare = () => {
    const message = `You're invited! 🎊\n\n*${eventData.title}*\n${eventData.subtitle}\n\n📅 ${eventData.date}\n📍 ${eventData.venue}\n\nWe can't wait to celebrate with you!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#06060c] text-[#f0ede4] flex flex-col relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#d4a843]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-[#222238]/60 bg-[#06060c]/80 backdrop-blur-xl">
        <Link href="/create" className="flex items-center gap-2 text-[#a8a498] hover:text-[#f0ede4] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Edit
        </Link>
        <div className="flex items-center gap-2">
          <div className="sdot dn text-[#06060c] bg-[#4ade80] border-[#4ade80]">✓</div><div className="w-8 h-0.5 bg-gradient-to-r from-[#4ade80] to-[#d4a843]"></div>
          <div className="sdot act">2</div><div className="w-8 h-0.5 bg-[#222238]"></div>
          <div className="sdot">3</div>
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 relative z-10 p-6 md:p-10 flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto w-full">
        
        {/* Canvas Area (Left) */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d4a843]" /> Your Masterpiece
            </h2>
            
            <div className="flex items-center gap-2 bg-[#12121f]/80 backdrop-blur-xl border border-[#222238] rounded-xl px-3 py-1.5">
              <Palette className="w-4 h-4 text-[#d4a843]" />
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none text-[#f0ede4] cursor-pointer"
              >
                <optgroup label="Premium Vector Designs" className="bg-[#12121f]">
                  <option value="royal_rajput">Royal Rajput Archway</option>
                  <option value="golden_mandala">Golden Mandala</option>
                  <option value="watercolor_florals">Watercolor Florals</option>
                  <option value="emerald_foil">Emerald & Gold Foil</option>
                  <option value="tropical_palm">Tropical Palm</option>
                  <option value="classic_damask">Classic Damask</option>
                  <option value="peacock_majesty">Peacock Majesty</option>
                  <option value="vintage_lace">Vintage Lace</option>
                  <option value="art_deco">Art Deco Gatsby</option>
                  <option value="celestial">Celestial Night</option>
                  <option value="minimalist_botanical">Minimalist Botanical</option>
                  <option value="rose_gold_brush">Rose Gold Brushstrokes</option>
                  <option value="haldi_marigold">Traditional Haldi</option>
                  <option value="gothic_romance">Gothic Romance</option>
                  <option value="rustic_wood">Rustic Wood & Lights</option>
                  <option value="modern_clean">Modern Clean</option>
                  <option value="boho_pampas">Boho Pampas Grass</option>
                  <option value="lotus_pond">Lotus Pond</option>
                  <option value="pearl_ribbon">Pearl & Ribbon</option>
                  <option value="geometric_marble">Geometric Marble</option>
                </optgroup>
              </select>
            </div>
          </div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg aspect-[3/4] rounded-3xl relative group"
            ref={cardRef}
          >
            <div className="absolute inset-0">
              <InvitationCard 
                themeId={theme}
                title={eventData.title}
                subtitle={eventData.subtitle}
                date={eventData.date}
                venue={eventData.venue}
              />
            </div>
          </motion.div>
        </div>

        {/* Tools Area (Right) */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-[#12121f]/80 backdrop-blur-xl border border-[#222238] rounded-3xl p-6">
            <h3 className="font-bold text-[#f0ede4] mb-4 flex items-center gap-2">
              <Download className="w-4 h-4 text-[#d4a843]" /> Export Assets
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={handlePDFDownload}
                disabled={isDownloading}
                className="w-full bg-[#222238] hover:bg-[#333350] text-[#f0ede4] h-12 flex flex-col py-8 rounded-xl border border-[#222238] hover:border-[#d4a843]/30"
              >
                <span className="font-bold">{isDownloading ? 'Exporting...' : 'PDF'}</span>
                <span className="text-[10px] text-[#a8a498]">Print Ready</span>
              </Button>
              <Button 
                onClick={handleDownload} 
                disabled={isDownloading}
                className="w-full bg-[#222238] hover:bg-[#333350] text-[#f0ede4] h-12 flex flex-col py-8 rounded-xl border border-[#222238] hover:border-[#d4a843]/30"
              >
                <span className="font-bold">{isDownloading ? 'Exporting...' : 'PNG'}</span>
                <span className="text-[10px] text-[#a8a498]">High Res</span>
              </Button>
            </div>
            <Button className="w-full mt-3 bg-[#12121f] text-[#f0ede4] border border-[#222238] hover:border-[#d4a843] h-12 rounded-xl">
              <Video className="w-4 h-4 mr-2 text-[#d4a843]" /> Generate Video Invite
            </Button>
          </div>

          <div className="bg-[#12121f]/80 backdrop-blur-xl border border-[#222238] rounded-3xl p-6">
            <h3 className="font-bold text-[#f0ede4] mb-4 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#d4a843]" /> Share & RSVP
            </h3>
            <div className="space-y-3">
              <Button 
                onClick={handleWhatsAppShare}
                className="w-full justify-start bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 h-12 rounded-xl"
              >
                Share on WhatsApp
              </Button>
              <Button className="w-full justify-start bg-[#222238] text-[#f0ede4] hover:bg-[#333350] border border-[#222238] h-12 rounded-xl">
                <QrCode className="w-4 h-4 mr-2" /> Get QR Code
              </Button>
            </div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-[#d4a843] to-[#b0882a] text-[#06060c] font-bold rounded-2xl h-14 hover:opacity-90 shadow-xl shadow-[#d4a843]/20">
            Publish & Manage RSVPs
          </Button>
        </div>

      </main>
      
      {/* Global styles for dots */}
      <style dangerouslySetInnerHTML={{__html: `
        .sdot { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; border: 2px solid #222238; color: #6a6a80; background: #12121f; flex-shrink: 0; }
        .sdot.act { border-color: #d4a843; color: #d4a843; background: rgba(212,168,67,.12); box-shadow: 0 0 20px rgba(212,168,67,.15); }
      `}} />
    </div>
  );
}
