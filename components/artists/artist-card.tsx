import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, CheckCircle, MapPin, MessageCircle } from 'lucide-react';
import { Artist } from '@/lib/mock-data';
import Image from 'next/image';

interface ArtistCardProps {
  artist: Artist;
  onQuoteRequest?: (artistId: string) => void;
}

export function ArtistCard({ artist, onQuoteRequest }: ArtistCardProps) {
  const handleQuoteRequest = () => {
    onQuoteRequest?.(artist.id);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-muted">
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className="object-cover"
        />
        {artist.verified && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-1">{artist.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {artist.location}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{artist.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({artist.reviewCount} reviews)
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {artist.category.slice(0, 2).map((cat) => (
              <Badge key={cat} variant="outline" className="text-xs">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Badge>
            ))}
            {artist.category.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{artist.category.length - 2} more
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {artist.bio}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">Starting from</span>
              <div className="font-semibold">
                {artist.priceRange === '0-25000' && '₹15,000'}
                {artist.priceRange === '25000-50000' && '₹35,000'}
                {artist.priceRange === '50000-100000' && '₹75,000'}
                {artist.priceRange === '100000-200000' && '₹1,50,000'}
                {artist.priceRange === '200000+' && '₹2,50,000'}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {artist.languages.slice(0, 2).join(', ')}
              {artist.languages.length > 2 && ` +${artist.languages.length - 2}`}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleQuoteRequest}
          className="w-full"
          variant="outline"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Ask for Quote
        </Button>
      </CardFooter>
    </Card>
  );
}