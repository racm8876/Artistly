'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';
import { artistCategories, locations, priceRanges } from '@/lib/mock-data';

interface FilterState {
  categories: string[];
  location: string;
  priceRange: string;
}

interface ArtistFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  resultCount: number;
}

export function ArtistFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  resultCount 
}: ArtistFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);
    
    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleLocationChange = (location: string) => {
    onFiltersChange({
      ...filters,
      location: location === 'all' ? '' : location
    });
  };

  const handlePriceRangeChange = (priceRange: string) => {
    onFiltersChange({
      ...filters,
      priceRange: priceRange === 'all' ? '' : priceRange
    });
  };

  const getActiveFiltersCount = () => {
    return filters.categories.length + 
           (filters.location ? 1 : 0) + 
           (filters.priceRange ? 1 : 0);
  };

  const removeFilter = (type: 'category' | 'location' | 'priceRange', value?: string) => {
    switch (type) {
      case 'category':
        onFiltersChange({
          ...filters,
          categories: filters.categories.filter(id => id !== value)
        });
        break;
      case 'location':
        onFiltersChange({
          ...filters,
          location: ''
        });
        break;
      case 'priceRange':
        onFiltersChange({
          ...filters,
          priceRange: ''
        });
        break;
    }
  };

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters ({getActiveFiltersCount()})
        </Button>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {resultCount} artists found
        </p>
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map(categoryId => {
            const category = artistCategories.find(c => c.id === categoryId);
            return (
              <Badge key={categoryId} variant="secondary" className="pr-1">
                {category?.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-2"
                  onClick={() => removeFilter('category', categoryId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}
          {filters.location && (
            <Badge variant="secondary" className="pr-1">
              {filters.location}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-2"
                onClick={() => removeFilter('location')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.priceRange && (
            <Badge variant="secondary" className="pr-1">
              {priceRanges.find(p => p.value === filters.priceRange)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-2"
                onClick={() => removeFilter('priceRange')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}

      {/* Filter Panel */}
      <div className={`space-y-4 ${isExpanded || 'lg:block'} ${!isExpanded && 'hidden'}`}>
        {/* Category Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {artistCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={category.id} 
                  className="text-sm font-normal cursor-pointer flex items-center gap-2"
                >
                  <span>{category.icon}</span>
                  {category.name}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Location Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filters.location || 'all'} onValueChange={handleLocationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Price Range Filter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Price Range</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filters.priceRange || 'all'} onValueChange={handlePriceRangeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Price Ranges</SelectItem>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}