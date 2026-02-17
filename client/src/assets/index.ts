/**
 * Centralized Assets Configuration
 * 
 * All images, logos, and media assets should be defined here.
 * This makes it easy to update assets in one place.
 * 
 * Usage:
 *   import { assets } from '@/assets' or './assets'
 *   <img src={assets.logo} alt="Logo" />
 * 
 * To add local images:
 *   1. Place image in public/ folder
 *   2. Reference as '/image-name.png'
 * 
 * Or import from src/assets/:
 *   import logoImage from './logo.png'
 *   export const logo = logoImage
 */

// =============================================================================
// LOGO & BRANDING
// =============================================================================

// Logo from Cloudinary (optimized with Cloudinary transformations)
// Transformations: f_auto (WebP format), q_auto (auto quality), w_800 (max width), c_limit (limit dimensions)
// Using Cloudinary transformations: f_auto (WebP), q_auto (quality), w_800 (width)
export const logo = 'https://res.cloudinary.com/doxluexqo/image/upload/v1769752720/0f0381e9-47d8-476f-b6c1-4bc81899f859.png';
export const strongestManAndWoman = 'https://res.cloudinary.com/doxluexqo/image/upload/v1769772043/image-removebg-preview_1_raaqof.png';

// Feature images from local files (module imports)
import feature1Image from './feature 1.png';
import feature2Image from './feature 3.png';
import feature3Image from './feature 4.png';
import feature4Image from './feature 2.png';

// =============================================================================
// EVENT IMAGES (Optimized with Cloudinary transformations)
// =============================================================================

export const eventImages = {
  deadlift: 'https://res.cloudinary.com/doxluexqo/image/upload/f_auto,q_auto,w_800,c_limit/v1768645606/event_1_mheui6.png',
  farmersWalk: 'https://res.cloudinary.com/doxluexqo/image/upload/f_auto,q_auto,w_800,c_limit/v1768645605/event_2_tdveq6.png',
  sandbagLoading: 'https://res.cloudinary.com/doxluexqo/image/upload/f_auto,q_auto,w_800,c_limit/v1768645606/event_3_q3jscn.png',
  tireFlip: 'https://res.cloudinary.com/doxluexqo/image/upload/f_auto,q_auto,w_800,c_limit/v1768645605/event_4_qmpmrc.png',
  yokeWalk: 'https://res.cloudinary.com/doxluexqo/image/upload/f_auto,q_auto,w_800,c_limit/v1768645605/event_5_hbkmmo.png',
};

// =============================================================================
// HERO & SECTION BACKGROUNDS
// =============================================================================

export const heroImages = {
  main: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop',
  // Add more hero/background images here
};

// =============================================================================
// FEATURE & CATEGORY IMAGES
// =============================================================================

export const featureImages = {
  strongmanCompetition: feature1Image,
  universityChampionship: feature2Image,
  strengthTraining: feature3Image,
  championshipTrophy: feature4Image,
};

// =============================================================================
// TEAM / PEOPLE IMAGES
// =============================================================================

export const teamImages = {
  // Add team member photos here
  // john: '/team/john.jpg',
  // jane: '/team/jane.jpg',
};

// =============================================================================
// SPONSOR / PARTNER LOGOS
// =============================================================================

export const sponsorLogos = {
  // Add sponsor logos here
  // sponsor1: '/sponsors/sponsor1.png',
  // sponsor2: '/sponsors/sponsor2.png',
};

// =============================================================================
// SHOP / PRODUCT IMAGES (for future use)
// =============================================================================

export const shopImages = {
  // Product images for when shop goes live
  // tshirt: '/products/tshirt.jpg',
  // hoodie: '/products/hoodie.jpg',
};

// =============================================================================
// ICONS & MISC
// =============================================================================

export const icons = {
  // Custom icons if needed
  // trophy: '/icons/trophy.svg',
};

// =============================================================================
// COMBINED ASSETS EXPORT
// =============================================================================

export const assets = {
  logo,
  events: eventImages,
  hero: heroImages,
  features: featureImages,
  team: teamImages,
  sponsors: sponsorLogos,
  shop: shopImages,
  icons,
};

export default assets;
