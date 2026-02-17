/**
 * CONTENT MANAGEMENT FILE
 * 
 * This is the centralized hub for all content management.
 * Manage all:
 * - Events (men & women)
 * - Images & URLs
 * - Event details
 * - Coaches information
 * - Shop products
 * - Other multimedia content
 * 
 * Simply update the data here and it will reflect across the entire application.
 */

// ============================================================================
// EVENT IMAGES - Image URLs for all events
// ============================================================================
export const menEventImages = {
  deadlift: 'https://res.cloudinary.com/doxluexqo/image/upload/f_auto,q_auto,w_800,c_limit/v1768645606/event_1_mheui6.png',
  farmersWalk: 'https://res.cloudinary.com/doxluexqo/image/upload/f_auto,q_auto,w_800,c_limit/v1768645605/event_2_tdveq6.png',
  sandbagLoading: 'https://res.cloudinary.com/doxluexqo/image/upload/f_auto,q_auto,w_800,c_limit/v1768645606/event_3_q3jscn.png',
  tireFlip: 'https://res.cloudinary.com/doxluexqo/image/upload/f_auto,q_auto,w_800,c_limit/v1768645605/event_4_qmpmrc.png',
  militaryPress: 'https://res.cloudinary.com/doxluexqo/image/upload/f_auto,q_auto,w_800,c_limit/v1768645605/event_5_hbkmmo.png',
};

export const womenEventImages = {
  deadlift: 'https://res.cloudinary.com/doxluexqo/image/upload/v1769276931/IMG_4241_hucps4.png',
  farmersWalk: 'https://res.cloudinary.com/doxluexqo/image/upload/v1769276929/IMG_4242_b9mawf.png',
  sandbagLoading: 'https://res.cloudinary.com/doxluexqo/image/upload/v1769276932/IMG_4243_wvae5g.png',
  tireFlip: 'https://res.cloudinary.com/doxluexqo/image/upload/v1769276930/IMG_4245_ugm4np.png',
  militaryPress: 'https://res.cloudinary.com/doxluexqo/image/upload/v1769276929/IMG_4246_ocl1qa.png',
};

// ============================================================================
// MEN'S EVENTS - All events for male competitors
// ============================================================================
export const menEvents = [
  {
    id: 'deadlift-men',
    title: "Deadlift for Reps",
    image: menEventImages.deadlift,
    category: 'Strength',
    details: [
      { label: "Weight", value: "150 kg for maximum repetitions" },
      { label: "Duration", value: "60 seconds" },
      { label: "Rules", value: "Full lockout at top, controlled descent" },
      { label: "Scoring", value: "1 point per valid rep" }
    ],
    note: "Athletes must demonstrate full range of motion. Mixed grip, straps, or hook grip allowed.",
    prizePool: {
      first: 20000,
      second: 15000,
      third: 10000,
      fourth: 10000
    }
  },
  {
    id: 'farmers-walk-men',
    title: "Farmer's Walk",
    image: menEventImages.farmersWalk,
    category: 'Endurance',
    details: [
      { label: "Weight", value: "40 kg per hand" },
      { label: "Distance", value: "20 meters" },
      { label: "Rules", value: "No dropping, continuous movement" },
      { label: "Scoring", value: "Time to complete + distance bonus" }
    ],
    note: "Grip strength and core stability are key. Fastest time wins.",
    prizePool: {
      first: 20000,
      second: 15000,
      third: 10000,
      fourth: 10000
    }
  },
  {
    id: 'sandbag-loading-men',
    title: "Sand Bag / Stone Loading",
    image: menEventImages.sandbagLoading,
    category: 'Technique',
    details: [
      { label: "Weight", value: "50 kg, 60 kg, 70 kg, 80 kg, 90 kg" },
      { label: "Height", value: "Load onto 1.2m platform" },
      { label: "Rules", value: "5 bags/stones loaded in sequence" },
      { label: "Scoring", value: "Time to complete all loads" }
    ],
    note: "Progressive weight loading. Each bag must clear the platform edge.",
    prizePool: {
      first: 20000,
      second: 15000,
      third: 10000,
      fourth: 10000
    }
  },
  {
    id: 'tire-flip-men',
    title: "Tire Flip",
    image: menEventImages.tireFlip,
    category: 'Power',
    details: [
      { label: "Weight", value: "200 kg tire" },
      { label: "Distance", value: "10 flips (20 meters)" },
      { label: "Rules", value: "Complete flip required, no rolling" },
      { label: "Scoring", value: "Time to complete all flips" }
    ],
    note: "Explosive power event. Tire must rotate 180° each flip.",
    prizePool: {
      first: 20000,
      second: 15000,
      third: 10000,
      fourth: 10000
    }
  },
  {
    id: 'military-press-men',
    title: "Barbell Standing Military Press",
    image: menEventImages.militaryPress,
    category: 'Strength',
    details: [
      { label: "Weight", value: "70-100 kg (154-220 LBS) – Increases by 10 kg per level" },
      { label: "Duration", value: "60 seconds for maximum reps" },
      { label: "Rules", value: "Strict press form required • No leg drive allowed • Full lockout at top" },
      { label: "Scoring", value: "Maximum reps in 60 seconds • Tie breaker = Max weight lifted" },
      { label: "Benefits", value: "Tests overhead strength • Improves pressing technique" }
    ],
    note: "Power • Control • Strength. This event tests pure upper body pressing power. Cash prizes: ₹20,000 (1st), ₹15,000 (2nd), ₹10,000 (3rd & 4th).",
    prizePool: {
      first: 20000,
      second: 15000,
      third: 10000,
      fourth: 10000
    }
  }
];

// ============================================================================
// WOMEN'S EVENTS - All events for female competitors
// ============================================================================
export const womenEvents = [
  {
    id: 'deadlift-women',
    title: "Deadlift for Reps",
    image: womenEventImages.deadlift,
    category: 'Strength',
    details: [
      { label: "Weight", value: "80 kg for maximum repetitions" },
      { label: "Duration", value: "60 seconds" },
      { label: "Rules", value: "Full lockout at top, controlled descent" },
      { label: "Scoring", value: "1 point per valid rep" }
    ],
    note: "Athletes must demonstrate full range of motion. Form over speed.",
    prizePool: {
      first: 15000,
      second: 10000,
      third: 7000,
      fourth: 5000
    }
  },
  {
    id: 'farmers-walk-women',
    title: "Farmer's Walk",
    image: womenEventImages.farmersWalk,
    category: 'Endurance',
    details: [
      { label: "Weight", value: "25 kg per hand" },
      { label: "Distance", value: "20 meters" },
      { label: "Rules", value: "No dropping, continuous movement" },
      { label: "Scoring", value: "Time to complete" }
    ],
    note: "Tests grip strength and determination.",
    prizePool: {
      first: 15000,
      second: 10000,
      third: 7000,
      fourth: 5000
    }
  },
  {
    id: 'sandbag-loading-women',
    title: "Sand Bag / Stone Loading",
    image: womenEventImages.sandbagLoading,
    category: 'Technique',
    details: [
      { label: "Weight", value: "30 kg, 40 kg, 50 kg, 60 kg" },
      { label: "Height", value: "Load onto 1.1m platform" },
      { label: "Rules", value: "4 bags/stones loaded in sequence" },
      { label: "Scoring", value: "Time to complete all loads" }
    ],
    note: "Focus on explosive lifting and proper lap position.",
    prizePool: {
      first: 15000,
      second: 10000,
      third: 7000,
      fourth: 5000
    }
  },
  {
    id: 'tire-flip-women',
    title: "Tire Flip",
    image: womenEventImages.tireFlip,
    category: 'Power',
    details: [
      { label: "Weight", value: "120 kg tire" },
      { label: "Distance", value: "8 flips (16 meters)" },
      { label: "Rules", value: "Complete flip required, no rolling" },
      { label: "Scoring", value: "Time to complete all flips" }
    ],
    note: "Drive with the legs, not just the back.",
    prizePool: {
      first: 15000,
      second: 10000,
      third: 7000,
      fourth: 5000
    }
  },
  {
    id: 'military-press-women',
    title: "Barbell Standing Military Press",
    image: womenEventImages.militaryPress,
    category: 'Strength',
    details: [
      { label: "Weight", value: "30-45 kg – Increases by 5 kg per level" },
      { label: "Duration", value: "60 seconds for maximum reps" },
      { label: "Rules", value: "Strict press form required • No leg drive allowed" },
      { label: "Scoring", value: "Maximum reps in 60 seconds" }
    ],
    note: "Tests overhead pressing power and stability.",
    prizePool: {
      first: 15000,
      second: 10000,
      third: 7000,
      fourth: 5000
    }
  }
];

// ============================================================================
// COACHES DATA - All coach information
// ============================================================================
export const coachesData = [
  {
    id: 'coach-1',
    name: 'Coach Name 1',
    image: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/coach1.jpg',
    category: 'Strongman Training',
    experience: '15+ years',
    specialization: 'Deadlift & Squat',
    bio: 'Expert in powerlifting and strongman training techniques'
  },
  {
    id: 'coach-2',
    name: 'Coach Name 2',
    image: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/coach2.jpg',
    category: 'Conditioning',
    experience: '12+ years',
    specialization: 'Endurance & Conditioning',
    bio: 'Specializes in athletic conditioning and performance'
  }
];

// ============================================================================
// SHOP PRODUCTS - All products available for purchase
// ============================================================================
export const shopProducts = [
  {
    id: 'prod-1',
    name: 'Strongman Championship T-Shirt',
    price: 499,
    image: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/tshirt.jpg',
    category: 'Apparel',
    description: 'Official event merchandise',
    inStock: true,
    colors: ['Black', 'Red', 'Blue']
  },
  {
    id: 'prod-2',
    name: 'Training Guide',
    price: 799,
    image: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/guide.jpg',
    category: 'Educational',
    description: 'Complete strongman training guide',
    inStock: true,
    colors: ['Standard']
  }
];

// ============================================================================
// IMAGE SHOWCASE - Images for the image carousel/showcase section
// ============================================================================
export const showcaseImages = [
  {
    id: 'showcase-1',
    url: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/showcase1.jpg',
    alt: 'Event Moment 1',
    caption: 'Intense Competition'
  },
  {
    id: 'showcase-2',
    url: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/showcase2.jpg',
    alt: 'Event Moment 2',
    caption: 'Champion Crowned'
  },
  {
    id: 'showcase-3',
    url: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/showcase3.jpg',
    alt: 'Event Moment 3',
    caption: 'Crowd Support'
  }
];

// ============================================================================
// GALLERY IMAGES - Images for university and other sections
// ============================================================================
export const galleryImages = [
  {
    id: 'gallery-1',
    url: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/gallery1.jpg',
    alt: 'Gallery 1'
  },
  {
    id: 'gallery-2',
    url: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/gallery2.jpg',
    alt: 'Gallery 2'
  }
];

// ============================================================================
// FEATURED EVENTS - Events to display in the main events section
// ============================================================================
export const featuredEvents = [
  {
    id: 'featured-1',
    title: 'Main Championship',
    date: '2026-02-15',
    location: 'Sports Complex, City',
    image: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/event-main.jpg',
    description: 'The ultimate strongman competition',
    status: 'Upcoming'
  },
  {
    id: 'featured-2',
    title: 'Regional Qualifier',
    date: '2026-02-01',
    location: 'Regional Stadium',
    image: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/event-regional.jpg',
    description: 'Qualifier round for the championship',
    status: 'Upcoming'
  }
];

// ============================================================================
// UNIVERSITY PARTNERS - Universities participating or sponsoring
// ============================================================================
export const universityPartners = [
  {
    id: 'uni-1',
    name: 'University 1',
    logo: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/uni1-logo.png',
    description: 'Leading partner in fitness education'
  },
  {
    id: 'uni-2',
    name: 'University 2',
    logo: 'https://res.cloudinary.com/doxluexqo/image/upload/v1234567890/uni2-logo.png',
    description: 'Supporting sports development'
  }
];

// ============================================================================
// SOCIAL MEDIA & EXTERNAL LINKS
// ============================================================================
export const socialLinks = {
  instagram: 'https://instagram.com/youraccount',
  facebook: 'https://facebook.com/youraccount',
  twitter: 'https://twitter.com/youraccount',
  youtube: 'https://youtube.com/youraccount',
  whatsapp: 'https://wa.me/1234567890'
};

// ============================================================================
// CONTACT INFORMATION
// ============================================================================
export const contactInfo = {
  email: 'thefightclubchampionship@gmail.com',
  phone: '+91-XXXXXXXXXX',
  supportEmail: 'thefightclubchampionship@gmail.com'
};

// ============================================================================
// INAUGURATION DETAILS
// ============================================================================
export const inauguractionDetails = {
  guests: [
    {
      name: 'Kalvakuntla Taraka Rama Rao (KTR Sir)',
      image: 'https://res.cloudinary.com/doxluexqo/image/upload/q_auto,f_auto,w_800/v1768927291/425229df-02fb-4e61-b555-2242854784f3.png'
    },
    {
      name: 'Repalle Shiva Praveen Kumar (RSP Sir)',
      image: 'https://res.cloudinary.com/doxluexqo/image/upload/q_auto,f_auto,w_800/v1768927291/repalle-image.png'
    }
  ],
  date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  venue: 'Main Stadium'
};

// ============================================================================
// VISION & MISSION
// ============================================================================
export const visionMission = {
  vision: 'To create a world-class strongman competition platform',
  mission: 'Promoting strength, determination, and athletic excellence',
  values: [
    'Excellence',
    'Integrity',
    'Community',
    'Growth'
  ]
};

// ============================================================================
// HOW TO USE THIS FILE
// ============================================================================
/**
 * STEP 1: Update Image URLs
 * Replace all Cloudinary URLs with your own images:
 * - eventImages - Update event-specific images
 * - showcaseImages - Update carousel images
 * - coachesData - Update coach photos
 * 
 * STEP 2: Add/Remove Events
 * Edit menEvents and womenEvents arrays:
 * - Add new events by copying an existing event object and modifying
 * - Remove events by deleting the object from the array
 * 
 * STEP 3: Update Event Details
 * Modify details array in each event:
 * - Add more detail fields as needed
 * - Update prize pools
 * 
 * STEP 4: Manage Other Content
 * - Update coaches data
 * - Update shop products
 * - Update contact information
 * - Add social media links
 * 
 * STEP 5: Use in Components
 * Import this file in your components:
 * import { menEvents, womenEvents, coachesData, shopProducts } from '@/content';
 */
