import React, { useState } from 'react';
import { V2Nav } from '../v2/components/V2Nav';
import { Hero } from '../../components/Hero';
import { PartnersMetrics } from '../../components/PartnersMetrics';
import { BenefitsCard } from '../../components/BenefitsCard';
import { ProductShowcase } from '../../components/ProductShowcase';
import { WorkflowProcess } from '../../components/WorkflowProcess';
import { FAQSection } from '../../components/FAQSection';
import { Footer } from '../../components/Footer';
import { PartnerSection } from '../../components/PartnerSection';
import { AgentModal } from '../../components/AgentModal';
import { VersionProps } from '../types';

export const Version1: React.FC<VersionProps> = ({ onOpenLogin }) => {
  const [internalLoginOpen, setInternalLoginOpen] = useState(false);

  const handleOpenLogin = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      setInternalLoginOpen(true);
    }
  };

  return (
    <div className="bg-black text-slate-900 font-secondary selection:bg-slate-900 selection:text-white min-h-screen">
      {/* Same floating nav as V2 (V1 has no reviews section, so that link is left out) */}
      <V2Nav onOpenLogin={handleOpenLogin} hideReviews />

      {/* Main Curtain Content Container */}
      <main className="site-main-curtain">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Partners & Platform Scale Metrics (#providers is where the nav's Providers links land) */}
        <div id="providers" className="scroll-mt-24">
          <PartnersMetrics />
        </div>

        {/* 3. Liquid Benefits Expanding Card */}
        <BenefitsCard onOpenLogin={handleOpenLogin} />

        {/* 5. Horizontal Overlapping Product Showcase Panels */}
        <ProductShowcase />

        {/* 6. Four-Step Interactive Visual Workflow */}
        <WorkflowProcess />

        {/* 7. Frequently Asked Questions */}
        <FAQSection />

        {/* Become our partner (moved from V2) */}
        <PartnerSection />
      </main>

      {/* 8. Sticky Curtain Reveal Footer */}
      <Footer onOpenLogin={handleOpenLogin} />

      {/* Interactive Modals */}
      <AgentModal
        isOpen={internalLoginOpen}
        onClose={() => setInternalLoginOpen(false)}
      />
    </div>
  );
};
