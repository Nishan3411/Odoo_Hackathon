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
    name: 'Barcelona',
    country: 'Spain',
    image:
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=80',
    tags: ['architecture', 'beaches', 'food'],
    priceIndex: '$$',
    bestFor: 'Creative city breaks',
  },
  {
    id: 2,
    name: 'Kyoto',
    country: 'Japan',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    tags: ['temples', 'gardens', 'culture'],
    priceIndex: '$$$',
    bestFor: 'Slow cultural travel',
  },
  {
    id: 3,
    name: 'Reykjavik',
    country: 'Iceland',
    image:
      'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=900&q=80',
    tags: ['nature', 'northern lights', 'drives'],
    priceIndex: '$$$$',
    bestFor: 'Outdoor adventure',
  },
  {
    id: 4,
    name: 'Lisbon',
    country: 'Portugal',
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900&q=80',
    tags: ['coast', 'cafes', 'history'],
    priceIndex: '$$',
    bestFor: 'Sunny remote work',
  },
]

export const activities = [
  {
    id: 1,
    city: 'Barcelona',
    name: 'Sagrada Familia guided visit',
    category: 'Culture',
    icon: Landmark,
    duration: '2.5 hrs',
    cost: 42,
    rating: 4.9,
  },
  {
    id: 2,
    city: 'Barcelona',
    name: 'Gothic Quarter tapas crawl',
    category: 'Food',
    icon: Utensils,
    duration: '3 hrs',
    cost: 68,
    rating: 4.8,
  },
  {
    id: 3,
    city: 'Kyoto',
    name: 'Arashiyama bamboo walk',
    category: 'Nature',
    icon: Mountain,
    duration: '2 hrs',
    cost: 18,
    rating: 4.7,
  },
  {
    id: 4,
    city: 'Reykjavik',
    name: 'Northern lights chase',
    category: 'Adventure',
    icon: Compass,
    duration: '5 hrs',
    cost: 115,
    rating: 4.9,
  },
  {
    id: 5,
    city: 'Lisbon',
    name: 'Alfama photo walk',
    category: 'Creative',
    icon: Camera,
    duration: '2 hrs',
    cost: 36,
    rating: 4.6,
  },
  {
    id: 6,
    city: 'Lisbon',
    name: 'Tagus sunset sail',
    category: 'Relax',
    icon: Sailboat,
    duration: '2 hrs',
    cost: 54,
    rating: 4.8,
  },
]

export const trips = [
  {
    id: 'mediterranean-loop',
    title: 'Mediterranean Loop',
    status: 'Planning',
    dates: 'Jun 12 - Jun 24, 2026',
    image:
      'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=900&q=80',
    cities: ['Barcelona', 'Lisbon', 'Nice'],
    collaborators: 4,
    budget: 2860,
    completion: 72,
  },
  {
    id: 'japan-spring',
    title: 'Japan Spring Route',
    status: 'Booked',
    dates: 'Apr 2 - Apr 16, 2027',
    image:
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=900&q=80',
    cities: ['Tokyo', 'Kyoto', 'Osaka'],
    collaborators: 2,
    budget: 4120,
    completion: 88,
  },
  {
    id: 'nordic-lights',
    title: 'Nordic Lights',
    status: 'Draft',
    dates: 'Nov 4 - Nov 13, 2026',
    image:
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=900&q=80',
    cities: ['Reykjavik', 'Vik', 'Akureyri'],
    collaborators: 1,
    budget: 3375,
    completion: 46,
  },
]

export const stops = [
  {
    id: 1,
    city: 'Barcelona',
    dates: 'Jun 12 - Jun 16',
    stay: 'Casa Bonay',
    transport: 'Flight lands 10:20 AM',
    highlights: ['Gaudi trail', 'Tapas night', 'Beach morning'],
  },
  {
    id: 2,
    city: 'Lisbon',
    dates: 'Jun 16 - Jun 20',
    stay: 'Memmo Alfama',
    transport: 'TAP Portugal 2:40 PM',
    highlights: ['Alfama', 'Belem', 'Sunset sail'],
  },
  {
    id: 3,
    city: 'Nice',
    dates: 'Jun 20 - Jun 24',
    stay: 'Hotel Rossetti',
    transport: 'Train via Marseille',
    highlights: ['Old town', 'Eze day trip', 'Promenade'],
  },
]

export const budgetBreakdown = [
  { name: 'Flights', value: 780, color: '#0ea5e9' },
  { name: 'Stays', value: 920, color: '#14b8a6' },
  { name: 'Food', value: 430, color: '#fb7185' },
  { name: 'Activities', value: 520, color: '#f97316' },
  { name: 'Local transit', value: 210, color: '#64748b' },
]

export const budgetTimeline = [
  { day: 'Jun 12', planned: 420, actual: 390 },
  { day: 'Jun 14', planned: 620, actual: 660 },
  { day: 'Jun 16', planned: 980, actual: 910 },
  { day: 'Jun 18', planned: 1300, actual: 1260 },
  { day: 'Jun 20', planned: 1880, actual: 1810 },
  { day: 'Jun 22', planned: 2320, actual: 2255 },
  { day: 'Jun 24', planned: 2860, actual: 2740 },
]

export const checklist = [
  { id: 1, item: 'Passport and travel insurance', category: 'Documents', done: true },
  { id: 2, item: 'Universal adapter', category: 'Gear', done: true },
  { id: 3, item: 'Light rain jacket', category: 'Clothing', done: false },
  { id: 4, item: 'Day bag and packing cubes', category: 'Gear', done: false },
  { id: 5, item: 'Restaurant reservations', category: 'Plans', done: true },
]

export const notes = [
  {
    id: 1,
    title: 'Food ideas',
    body: 'Book one special dinner in each city, leave lunches open for neighborhood wandering.',
    updated: 'Today',
  },
  {
    id: 2,
    title: 'Share link copy',
    body: 'Keep the public itinerary clean: dates, stops, budget range, and top activities only.',
    updated: 'Yesterday',
  },
]

export const adminMetrics = [
  { label: 'Active trips', value: '1,284', change: '+18%', icon: MapPinned },
  { label: 'Public shares', value: '436', change: '+31%', icon: BadgeCheck },
  { label: 'Cities indexed', value: '128', change: '+12', icon: Compass },
  { label: 'Checklist usage', value: '72%', change: '+9%', icon: Luggage },
]

export const timelineDays = [
  {
    day: 'Day 1',
    date: 'Jun 12',
    title: 'Arrive in Barcelona',
    items: ['Check in at Casa Bonay', 'Gothic Quarter walk', 'Tapas crawl'],
    icon: Coffee,
  },
  {
    day: 'Day 2',
    date: 'Jun 13',
    title: 'Gaudi and beach',
    items: ['Sagrada Familia', 'Park Guell', 'Barceloneta sunset'],
    icon: Bike,
  },
  {
    day: 'Day 3',
    date: 'Jun 14',
    title: 'Creative neighborhoods',
    items: ['El Born studios', 'Picasso Museum', 'Rooftop dinner'],
    icon: Camera,
  },
]
