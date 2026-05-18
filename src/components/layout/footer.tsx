import Link from 'next/link';
import Image from 'next/image';
import { Share2, Globe, MessageCircle, Video, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Featured', href: '/featured' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Deals', href: '/deals' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Returns & Refunds', href: '/returns' },
    { name: 'Track Order', href: '/track-order' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">
              ShopSwift
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Experience the future of shopping with ShopSwift. Premium products, lightning-fast delivery, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-5 w-5" suppressHydrationWarning />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" suppressHydrationWarning />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="h-5 w-5" suppressHydrationWarning />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Video className="h-5 w-5" suppressHydrationWarning />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary shrink-0" suppressHydrationWarning />
                  <span>123 Commerce St, Digital City, 10101</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary shrink-0" suppressHydrationWarning />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary shrink-0" suppressHydrationWarning />
                  <span>support@shopswift.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ShopSwift. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <div className="relative h-4 w-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" fill className="object-contain" />
            </div>
            <div className="relative h-6 w-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" fill className="object-contain" />
            </div>
            <div className="relative h-4 w-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" fill className="object-contain" />
            </div>
            <div className="relative h-6 w-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_logo%2C_revised_2016.svg" alt="Stripe" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
