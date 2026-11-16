import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { AgentModal } from '../../components/AgentModal';
import { VersionProps } from '../types';
import { V2Nav } from '../v2/components/V2Nav';
import { V2Footer } from '../v2/components/V2Footer';
import { V2Product } from '../v2/v2Data';
import { V3Hero } from './components/V3Hero';
import { V3Insurers } from './components/V3Insurers';
import { V3HowItWorks } from './components/V3HowItWorks';
import { V3Why } from './components/V3Why';
import { V3Impact } from './components/V3Impact';
import { V3Testimonials } from './components/V3Testimonials';
import { V3StudentsBanner } from './components/V3StudentsBanner';
import { V3Faq } from './components/V3Faq';
import { V3Partner } from './components/V3Partner';

// V3: V2's sections, in V2's order, each redesigned as a V3 component.
// Only the nav and footer are shared with V2.
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

        <V3Insurers />
        <V3StudentsBanner />
        <V3HowItWorks />
        <V3Why />
        <V3Impact />
        <V3Testimonials />
        <V3Faq />
        <V3Partner />
        <V2Footer />

        <AgentModal isOpen={internalLoginOpen} onClose={() => setInternalLoginOpen(false)} />
      </div>
    </MotionConfig>
  );
};
