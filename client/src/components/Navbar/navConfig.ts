export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navItems: NavItem[] = [
  { href: '#home', label: 'Home' },
  { 
    href: '#events', 
    label: 'Events',
    children: [
      { href: '#events-armwrestling', label: 'Arm Wrestling Competition' },
      { href: '#events-cycling', label: 'Cycling Competition' },
      { href: '#events-deadlift', label: 'Deadlift Competition' },
      { href: '#events-legkicks', label: 'Leg Kicks Competition' },
      { href: '#events-pullups', label: 'Pull-ups Competition' },
      { href: '#events-running', label: 'Running Competition' },
      { href: '#events-skipping', label: 'Skipping Competition' },
    ]
  },
  { 
    href: '#strongest-human', 
    label: 'Strongest Human',
    children: [
      { href: '#strongest-woman', label: 'Strongest Woman Competition' },
      { href: '#strongest-man', label: 'Strongest Man Competition' },
    ]
  },
  { href: '#university', label: 'University' },
  { 
    href: '#coaches', 
    label: 'Coaches',
    children: [
      { href: '#coaches-athletes', label: 'Athletes' },
      { href: '#coaches-coaches', label: 'Coaches' },
      { href: '#coaches-gyms', label: 'Gyms' },
    ]
  },
  { href: '#shop', label: 'Shop' },
  { href: '#vision', label: 'Vision' },
  { href: '#contact', label: 'Contact' },
];
