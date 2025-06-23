export interface Artist {
  id: string;
  name: string;
  category: string[];
  location: string;
  priceRange: string;
  languages: string[];
  bio: string;
  image: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
}

export interface ArtistSubmission extends Artist {
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  email: string;
  phone: string;
}

export const artistCategories = [
  { id: 'singers', name: 'Singers', icon: '🎤', description: 'Professional vocalists for all genres' },
  { id: 'dancers', name: 'Dancers', icon: '💃', description: 'Choreographers and dance performers' },
  { id: 'speakers', name: 'Speakers', icon: '🎯', description: 'Motivational and keynote speakers' },
  { id: 'djs', name: 'DJs', icon: '🎧', description: 'Professional DJs and music mixers' },
  { id: 'musicians', name: 'Musicians', icon: '🎸', description: 'Instrumentalists and bands' },
  { id: 'comedians', name: 'Comedians', icon: '😂', description: 'Stand-up and entertainment comedians' }
];

export const locations = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur'
];

export const priceRanges = [
  { value: '0-25000', label: '₹0 - ₹25,000' },
  { value: '25000-50000', label: '₹25,000 - ₹50,000' },
  { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
  { value: '100000-200000', label: '₹1,00,000 - ₹2,00,000' },
  { value: '200000+', label: '₹2,00,000+' }
];

export const languages = [
  'Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 
  'Gujarati', 'Urdu', 'Kannada', 'Malayalam', 'Punjabi', 'Assamese'
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    category: ['singers', 'musicians'],
    location: 'Mumbai',
    priceRange: '50000-100000',
    languages: ['Hindi', 'English', 'Punjabi'],
    bio: 'Professional playback singer with 8+ years experience in Bollywood industry.',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviewCount: 156,
    verified: true
  },
  {
    id: '2',
    name: 'Priya Nair',
    category: ['dancers'],
    location: 'Chennai',
    priceRange: '25000-50000',
    languages: ['Tamil', 'English', 'Malayalam'],
    bio: 'Classical Bharatanatyam dancer and choreographer specializing in fusion performances.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviewCount: 89,
    verified: true
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    category: ['speakers'],
    location: 'Delhi',
    priceRange: '100000-200000',
    languages: ['Hindi', 'English'],
    bio: 'Motivational speaker and corporate trainer with expertise in leadership development.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviewCount: 234,
    verified: true
  },
  {
    id: '4',
    name: 'DJ Vikram',
    category: ['djs'],
    location: 'Bangalore',
    priceRange: '25000-50000',
    languages: ['English', 'Hindi', 'Kannada'],
    bio: 'Electronic music producer and DJ specializing in weddings and corporate events.',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviewCount: 198,
    verified: false
  },
  {
    id: '5',
    name: 'Sneha Gupta',
    category: ['singers', 'musicians'],
    location: 'Pune',
    priceRange: '0-25000',
    languages: ['Hindi', 'Marathi', 'English'],
    bio: 'Folk singer and acoustic guitarist performing traditional and contemporary music.',
    image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviewCount: 67,
    verified: true
  },
  {
    id: '6',
    name: 'Amit Joshi',
    category: ['comedians'],
    location: 'Mumbai',
    priceRange: '50000-100000',
    languages: ['Hindi', 'English', 'Gujarati'],
    bio: 'Stand-up comedian and improvisational artist with regular shows across India.',
    image: 'https://images.pexels.com/photos/1436131/pexels-photo-1436131.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviewCount: 312,
    verified: true
  },
  {
    id: '7',
    name: 'Kavya Reddy',
    category: ['dancers', 'singers'],
    location: 'Hyderabad',
    priceRange: '25000-50000',
    languages: ['Telugu', 'English', 'Hindi'],
    bio: 'Contemporary dancer and vocalist specializing in cultural fusion performances.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviewCount: 143,
    verified: true
  },
  {
    id: '8',
    name: 'Rohit Malhotra',
    category: ['musicians'],
    location: 'Delhi',
    priceRange: '100000-200000',
    languages: ['Hindi', 'English', 'Punjabi'],
    bio: 'Professional tabla player and music composer for films and live performances.',
    image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviewCount: 201,
    verified: true
  }
];

export const mockSubmissions: ArtistSubmission[] = [
  {
    ...mockArtists[0],
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'approved',
    email: 'arjun.sharma@email.com',
    phone: '+91-9876543210'
  },
  {
    ...mockArtists[1],
    submittedAt: '2024-01-14T14:20:00Z',
    status: 'pending',
    email: 'priya.nair@email.com',
    phone: '+91-9876543211'
  },
  {
    ...mockArtists[3],
    submittedAt: '2024-01-13T09:15:00Z',
    status: 'rejected',
    email: 'dj.vikram@email.com',
    phone: '+91-9876543212'
  }
];