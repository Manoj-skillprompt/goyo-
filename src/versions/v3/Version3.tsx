import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { AgentModal } from '../../components/AgentModal';
import { VersionProps } from '../types';
import { V2Nav } from '../v2/components/V2Nav';
import { PartnersMetrics } from '../v2/components/PartnersMetrics';
import { StudentsBanner } from '../v2/components/StudentsBanner';
import { HowItWorks } from '../v2/components/HowItWorks';
import { WhyChooseGoyo } from '../v2/components/WhyChooseGoyo';
import { ImpactPanel } from '../v2/components/ImpactPanel';
import { Testimonials } from '../v2/components/Testimonials';
import { FAQSection } from '../v2/components/FAQSection';
import { PartnerSection } from '../v2/components/PartnerSection';
import { V2Footer } from '../v2/components/V2Footer';
import { V2Product } from '../v2/v2Data';
import { V3Hero } from './components/V3Hero';

// V3: V2's page with a conversion-focused hero. Every section below the hero reuses V2's
// components, so improvements made there carry over here.
export const Version3: React.FC<VersionProps> = ({ onOpenLogin }) => {
  const [internalLoginOpen, setInternalLoginOpen] = useState(false);

  const handleOpenLogin = () => {
    if (onOpenLogin) onOpenLogin();
    else setInternalLoginOpen(true);
  };

  // Health cover products jump to the providers; the rest to "How it works".
  const handleSelectProduct = (product: V2Product) => {
    const target = product.id === 'oshc' || product.id === 'ovhc' ? 'providers' : 'how-it-works';
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-slate-50 font-secondary text-slate-900 selection:bg-slate-900 selection:text-white">
        <V2Nav onOpenLogin={handleOpenLogin} />
        <V3Hero onSelectProduct={handleSelectProduct} />

        <div id="providers" className="scroll-mt-24 text-slate-900">
          <PartnersMetrics />
        </div>
        <StudentsBanner />
        <HowItWorks />
        <WhyChooseGoyo />
        <ImpactPanel />
        <Testimonials />
        <FAQSection />
        <PartnerSection />
        <V2Footer />

        <AgentModal isOpen={internalLoginOpen} onClose={() => setInternalLoginOpen(false)} />
      </div>
    </MotionConfig>
  );
};
