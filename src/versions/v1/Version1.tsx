import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Hero } from '../../components/Hero';
import { PartnersMetrics } from '../../components/PartnersMetrics';
import { BenefitsCard } from '../../components/BenefitsCard';
import { ProductOverview } from '../../components/ProductOverview';
import { ProductShowcase } from '../../components/ProductShowcase';
import { WorkflowProcess } from '../../components/WorkflowProcess';
import { FAQSection } from '../../components/FAQSection';
import { Footer } from '../../components/Footer';
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

  const handleSelectProduct = (index: number) => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      const vh = window.innerHeight || 800;
      const targetTop = window.scrollY + productsSection.getBoundingClientRect().top + index * vh;
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-black text-slate-900 font-sans selection:bg-slate-900 selection:text-white min-h-screen">
      {/* Floating Navigation */}
      <Navbar onOpenLogin={handleOpenLogin} />

      {/* Main Curtain Content Container */}
      <main className="site-main-curtain">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Partners & Platform Scale Metrics */}
        <PartnersMetrics />

        {/* 3. Liquid Benefits Expanding Card */}
        <BenefitsCard onOpenLogin={handleOpenLogin} />

        {/* 4. Product Overview Deck (3D Spread) */}
        <ProductOverview onSelectProduct={handleSelectProduct} />

        {/* 5. Horizontal Overlapping Product Showcase Panels */}
        <ProductShowcase />

        {/* 6. Four-Step Interactive Visual Workflow */}
        <WorkflowProcess />

        {/* 7. Frequently Asked Questions */}
        <FAQSection />
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
