'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArtistCard } from '@/components/artists/artist-card';
import { ArtistFilters } from '@/components/artists/artist-filters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Search, Grid, List } from 'lucide-react';
import { mockArtists } from '@/lib/mock-data';

interface FilterState {
  categories: string[];
  location: string;
  priceRange: string;
}

export default function ArtistsPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('rating');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    location: '',
    priceRange: ''
  });

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
  }, [searchParams]);

  // Filter and sort artists
  const filteredArtists = useMemo(() => {
    let filtered = mockArtists.filter(artist => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = artist.name.toLowerCase().includes(query);
        const matchesCategory = artist.category.some(cat => 
          cat.toLowerCase().includes(query)
        );
        const matchesLocation = artist.location.toLowerCase().includes(query);
        const matchesBio = artist.bio.toLowerCase().includes(query);
        
        if (!(matchesName || matchesCategory || matchesLocation || matchesBio)) {
          return false;
        }
      }

      // Category filter
      if (filters.categories.length > 0) {
        const hasMatchingCategory = filters.categories.some(filterCategory =>
          artist.category.includes(filterCategory)
        );
        if (!hasMatchingCategory) return false;
      }

      // Location filter
      if (filters.location && artist.location !== filters.location) {
        return false;
      }

      // Price range filter
      if (filters.priceRange && artist.priceRange !== filters.priceRange) {
        return false;
      }

      return true;
    });

    // Sort artists
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const handleQuoteRequest = (artistId: string) => {
    const artist = mockArtists.find(a => a.id === artistId);
    toast.success(`Quote request sent to ${artist?.name}! They'll respond within 24 hours.`);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      location: '',
      priceRange: ''
    });
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Artists</h1>
        <p className="text-muted-foreground">
          Find the perfect artist for your event from our curated list of professionals
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <ArtistFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
            resultCount={filteredArtists.length}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search artists, skills, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredArtists.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No artists found matching your criteria
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredArtists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  onQuoteRequest={handleQuoteRequest}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}