'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, CheckCircle, Users, Calendar, Award } from 'lucide-react';
import { artistCategories } from '@/lib/mock-data';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { icon: Users, label: 'Verified Artists', value: '2,500+' },
    { icon: Calendar, label: 'Events Completed', value: '15,000+' },
    { icon: Star, label: 'Average Rating', value: '4.8/5' },
    { icon: Award, label: 'Cities Covered', value: '50+' },
  ];

  const features = [
    {
      icon: CheckCircle,
      title: 'Verified Artists',
      description: 'All artists are background-verified and have proven track records'
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'Real reviews and ratings from previous clients help you make informed decisions'
    },
    {
      icon: Users,
      title: 'Easy Booking',
      description: 'Simple booking process with transparent pricing and instant quotes'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
            Book <span className="text-primary">Professional Artists</span> for Your Next Event
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with verified singers, dancers, speakers, DJs and more. 
            Make your events unforgettable with India's top performing artists.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for artists, categories, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button size="lg" asChild>
              <Link href="/artists">Explore Artists</Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary">Free Quotes</Badge>
            <Badge variant="secondary">Verified Profiles</Badge>
            <Badge variant="secondary">Secure Booking</Badge>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect artist for your event from our diverse range of talented performers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artistCategories.map((category) => (
            <Link key={category.id} href={`/artists?category=${category.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Artistly?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find and book the right artist for your event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 text-center">
        <div className="bg-primary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Perfect Artist?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of event planners who trust Artistly for their entertainment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/artists">Browse Artists</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/onboarding">Join as Artist</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}