import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Truck, Users, Award, Zap, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto py-12">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
          We&apos;re Redefining the <span className="text-primary">Shopping Experience</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          ShopSwift was founded in 2026 with a simple mission: to make premium products 
          accessible to everyone through a seamless, fast, and delightful online platform.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Happy Customers', value: '1M+' },
          { label: 'Premium Products', value: '50k+' },
          { label: 'Countries Served', value: '25+' },
          { label: 'Global Partners', value: '200+' },
        ].map((stat) => (
          <div key={stat.label} className="text-center space-y-2 p-8 bg-muted/30 rounded-3xl border">
            <p className="text-4xl font-black text-primary">{stat.value}</p>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Mission Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3 relative">
          <Image 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&h=800&fit=crop" 
            alt="Our Team" 
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl font-bold tracking-tight">Built by People who Care about Quality</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At ShopSwift, we don&apos;t just sell products; we curate experiences. Our team of 
            experts travels the globe to find manufacturers who share our commitment to 
            sustainable materials and exceptional craftsmanship.
          </p>
          <div className="space-y-4">
            {[
              { icon: ShieldCheck, title: 'Certified Quality', desc: 'Every product is hand-inspected by our QC team.' },
              { icon: Truck, title: 'Fast & Green', desc: 'Eco-friendly packaging and optimized shipping routes.' },
              { icon: Heart, title: 'Customer First', desc: '24/7 support from real people who love to help.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl h-fit">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Our Core Values</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">The principles that guide everything we do at ShopSwift.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: 'Innovation', desc: 'Constantly evolving our technology to serve you better.' },
            { icon: Award, title: 'Excellence', desc: 'Never settling for "good enough" in our service or products.' },
            { icon: Users, title: 'Inclusivity', desc: 'Creating a platform where everyone feels welcome and valued.' },
          ].map((value) => (
            <div key={value.title} className="p-8 rounded-3xl bg-card border shadow-lg space-y-4 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
