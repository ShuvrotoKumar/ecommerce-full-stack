import React from 'react';
import { Eye, Shield, Lock, Globe, Mail } from 'lucide-react';

export default function PrivacyPage() {
  const policies = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: 'We collect personal information that you provide to us, such as name, address, contact information, passwords and security data, and payment information.'
    },
    {
      icon: Shield,
      title: 'How We Use Your Info',
      content: 'We use personal information collected via our Services for a variety of business purposes, including to facilitate account creation, send administrative information, and fulfill and manage orders.'
    },
    {
      icon: Lock,
      title: 'Data Protection',
      content: 'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security measures are perfect.'
    },
    {
      icon: Globe,
      title: 'Cookies and Tracking',
      content: 'We may use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center space-y-4 mb-16">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: May 08, 2026</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none mb-16">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Your privacy is important to us. It is ShopSwift's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {policies.map((policy) => (
          <div key={policy.title} className="p-8 bg-muted/30 rounded-3xl border space-y-4">
            <div className="p-3 bg-primary/10 rounded-2xl w-fit">
              <policy.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{policy.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {policy.content}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-muted p-8 rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold">Your Rights</h2>
        <p className="text-muted-foreground leading-relaxed">
          Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete the data we have about you.
        </p>
        <div className="flex items-center gap-4 p-4 bg-background rounded-2xl border">
          <Mail className="h-5 w-5 text-primary" />
          <p className="text-sm">
            Contact us at <span className="font-bold">privacy@shopswift.com</span> to exercise your rights.
          </p>
        </div>
      </div>
    </div>
  );
}
