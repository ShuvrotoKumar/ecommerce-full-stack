import React from 'react';
import { ShieldCheck, FileText, Scale, Gavel } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using ShopSwift, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.'
    },
    {
      title: '2. User Accounts',
      content: 'When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.'
    },
    {
      title: '3. Intellectual Property',
      content: 'The Service and its original content, features, and functionality are and will remain the exclusive property of ShopSwift and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ShopSwift.'
    },
    {
      title: '4. Purchasing & Payment',
      content: 'All purchases made through our platform are subject to product availability. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase, inaccuracies, or errors in product or pricing information.'
    },
    {
      title: '5. Limitation of Liability',
      content: 'In no event shall ShopSwift, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center space-y-4 mb-16">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scale className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: May 08, 2026</p>
      </div>

      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.title} className="space-y-4 p-8 bg-muted/20 rounded-3xl border">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" /> {section.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}

        <div className="p-8 bg-primary/5 rounded-3xl border-2 border-primary/10">
          <div className="flex gap-4">
            <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
            <div className="space-y-2">
              <h3 className="font-bold">Contact Our Legal Team</h3>
              <p className="text-sm text-muted-foreground">
                If you have any questions about these Terms, please contact us at legal@shopswift.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
