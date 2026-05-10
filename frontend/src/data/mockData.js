import {
  BadgeCheck,
  Bike,
  Camera,
  Coffee,
  Compass,
  Landmark,
  Luggage,
  MapPinned,
  Mountain,
  Sailboat,
  Utensils,
} from 'lucide-react'

export const user = {
  name: 'Aarav Mehta',
  email: 'aarav@traveloop.app',
  role: 'Product Designer',
  homeCity: 'Bengaluru',
  avatar: 'AM',
  plan: 'Explorer Pro',
}

export const cities = [
  {
    id: 1,
    name: 'Jaipur',
    country: 'Rajasthan, India',
    image:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80',
    tags: ['forts', 'bazaars', 'heritage'],
    priceIndex: '₹₹',
    bestFor: 'Royal heritage weekends',
  },
  {
    id: 2,
    name: 'Varanasi',
    country: 'Uttar Pradesh, India',
    image:
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80',
    tags: ['ghats', 'spiritual', 'street food'],
    priceIndex: '₹₹',
    bestFor: 'Culture-rich slow travel',
  },
  {
    id: 3,
    name: 'Munnar',
    country: 'Kerala, India',
    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
    tags: ['tea estates', 'hills', 'nature'],
    priceIndex: '₹₹₹',
    bestFor: 'Monsoon escapes',
  },
  {
    id: 4,
    name: 'Goa',
    country: 'India',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80',
    tags: ['beaches', 'cafes', 'nightlife'],
    priceIndex: '₹₹₹',
    bestFor: 'Beach workations',
  },
]

export const activities = [
  {
    id: 1,
    city: 'Jaipur',
    name: 'Amber Fort sunrise walk',
    category: 'Heritage',
    icon: Landmark,
    duration: '2.5 hrs',
    cost: 2400,
    rating: 4.9,
  },
  {
    id: 2,
    city: 'Jaipur',
    name: 'Johari Bazaar food trail',
    category: 'Food',
    icon: Utensils,
    duration: '3 hrs',
    cost: 1800,
    rating: 4.8,
  },
  {
    id: 3,
    city: 'Varanasi',
    name: 'Ganga aarti boat experience',
    category: 'Culture',
    icon: Sailboat,
    duration: '2 hrs',
    cost: 2200,
    rating: 4.9,
  },
  {
    id: 4,
    city: 'Munnar',
    name: 'Tea estate cycling route',
    category: 'Nature',
    icon: Bike,
    duration: '4 hrs',
    cost: 1600,
    rating: 4.7,
  },
  {
    id: 5,
    city: 'Goa',
    name: 'Fontainhas photo walk',
    category: 'Creative',
    icon: Camera,
    duration: '2 hrs',
    cost: 1400,
    rating: 4.6,
  },
  {
    id: 6,
    city: 'Munnar',
    name: 'Eravikulam guided trek',
    category: 'Adventure',
    icon: Mountain,
    duration: '5 hrs',
    cost: 2600,
    rating: 4.8,
  },
]

export const trips = [
  {
    id: 'golden-triangle',
    title: 'Golden Triangle Getaway',
    status: 'Planning',
    dates: 'Oct 12 - Oct 21, 2026',
    image:
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80',
    cities: ['Delhi', 'Agra', 'Jaipur'],
    collaborators: 4,
    budget: 118000,
    completion: 72,
  },
  {
    id: 'kerala-monsoon',
    title: 'Kerala Monsoon Trail',
    status: 'Booked',
    dates: 'Aug 4 - Aug 13, 2026',
    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',
    cities: ['Kochi', 'Munnar', 'Alleppey'],
    collaborators: 2,
    budget: 96500,
    completion: 88,
  },
  {
    id: 'himalayan-workation',
    title: 'Himalayan Workation',
    status: 'Draft',
    dates: 'Dec 2 - Dec 12, 2026',
    image:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80',
    cities: ['Manali', 'Kasol', 'Dharamshala'],
    collaborators: 1,
    budget: 74500,
    completion: 46,
  },
]

export const stops = [
  {
    id: 1,
    city: 'Delhi',
    dates: 'Oct 12 - Oct 14',
    stay: 'The Lodhi',
    transport: 'Flight lands 9:40 AM',
    highlights: ['India Gate', 'Old Delhi food walk', 'Humayun Tomb'],
  },
  {
    id: 2,
    city: 'Agra',
    dates: 'Oct 14 - Oct 16',
    stay: 'Tajview Agra',
    transport: 'Gatimaan Express 8:10 AM',
    highlights: ['Taj sunrise', 'Agra Fort', 'Petha tasting'],
  },
  {
    id: 3,
    city: 'Jaipur',
    dates: 'Oct 16 - Oct 21',
    stay: 'Alsisar Haveli',
    transport: 'Private cab via Fatehpur Sikri',
    highlights: ['Amber Fort', 'Hawa Mahal', 'Bapu Bazaar'],
  },
]

export const budgetBreakdown = [
  { name: 'Flights', value: 32000, color: '#0ea5e9' },
  { name: 'Stays', value: 41000, color: '#14b8a6' },
  { name: 'Food', value: 14500, color: '#fb7185' },
  { name: 'Activities', value: 20500, color: '#f97316' },
  { name: 'Local transit', value: 10000, color: '#64748b' },
]

export const budgetTimeline = [
  { day: 'Oct 12', planned: 18000, actual: 17200 },
  { day: 'Oct 14', planned: 36000, actual: 38200 },
  { day: 'Oct 16', planned: 57000, actual: 54800 },
  { day: 'Oct 18', planned: 78000, actual: 76200 },
  { day: 'Oct 20', planned: 104000, actual: 101500 },
  { day: 'Oct 21', planned: 118000, actual: 114700 },
]

export const checklist = [
  { id: 1, item: 'Aadhaar, ID proof, and travel insurance', category: 'Documents', done: true },
  { id: 2, item: 'UPI, backup card, and cash for markets', category: 'Money', done: true },
  { id: 3, item: 'Light cotton layers and evening jacket', category: 'Clothing', done: false },
  { id: 4, item: 'Sunscreen, cap, and refillable bottle', category: 'Gear', done: false },
  { id: 5, item: 'Train tickets and fort entry bookings', category: 'Plans', done: true },
]

export const notes = [
  {
    id: 1,
    title: 'Food ideas',
    body: 'Book one haveli dinner in Jaipur, keep Delhi lunches open for Chandni Chowk and Khan Market finds.',
    updated: 'Today',
  },
  {
    id: 2,
    title: 'Share link copy',
    body: 'Keep the public itinerary clean: dates, city hops, rupee budget range, and top heritage experiences only.',
    updated: 'Yesterday',
  },
]

export const adminMetrics = [
  { label: 'Active trips', value: '1,284', change: '+18%', icon: MapPinned },
  { label: 'Public shares', value: '436', change: '+31%', icon: BadgeCheck },
  { label: 'Indian cities indexed', value: '128', change: '+12', icon: Compass },
  { label: 'Checklist usage', value: '72%', change: '+9%', icon: Luggage },
]

export const timelineDays = [
  {
    day: 'Day 1',
    date: 'Oct 12',
    title: 'Arrive in Delhi',
    items: ['Check in at The Lodhi', 'Humayun Tomb', 'Old Delhi dinner'],
    icon: Coffee,
  },
  {
    day: 'Day 2',
    date: 'Oct 13',
    title: 'Capital classics',
    items: ['India Gate', 'Lodhi Art District', 'Khan Market'],
    icon: Bike,
  },
  {
    day: 'Day 3',
    date: 'Oct 14',
    title: 'Agra sunrise route',
    items: ['Gatimaan Express', 'Agra Fort', 'Mehtab Bagh sunset'],
    icon: Camera,
  },
]
