import Link from 'next/link';
import { Music} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Music className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Artistly</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting event planners with talented artists across India. 
              Book verified performers for your next event.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Event Planners</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/artists" className="hover:text-primary transition-colors">Browse Artists</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Request Quotes</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Event Planning Guide</Link></li>
              {/* <li><Link href="#" className="hover:text-primary transition-colors">Customer Support</Link></li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Artists</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/onboarding" className="hover:text-primary transition-colors">Join as Artist</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Artist Dashboard</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Success Stories</Link></li>
              {/* <li><Link href="#" className="hover:text-primary transition-colors">Resources</Link></li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              {/* <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li> */}
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Artistly.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}