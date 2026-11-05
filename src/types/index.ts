export interface MetricItem {
  target: number;
  label: string;
  suffix: string;
  colorClass: string;
  delay: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  badge: string;
  description: string;
  calloutText: string;
  subText: string;
  subBadge: string;
  image: string;
  badgeColor: string;
}

