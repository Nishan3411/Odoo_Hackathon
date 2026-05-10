export function getDashboardPath(role) {
  const normalized = String(role || '').toLowerCase()
  if (normalized === 'admin') return '/admin/dashboard'
  if (normalized === 'guide' || normalized === 'travel_guide') return '/guide/dashboard'
  return '/dashboard'
}
