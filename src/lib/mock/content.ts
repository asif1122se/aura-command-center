import { ContentPost } from './types';

// Let's create content calendar posts scattered across June
export const calendarPosts: ContentPost[] = [
  {
    id: 'post_1',
    platform: 'Instagram',
    day: 2,
    title: 'Hormonal Health Tips Reel',
    hooks: [
      'Stop scrolling if your skin acts up same time every month...',
      'What your cycle is trying to tell you about your cortisol levels',
      'The 3 vitamins you actually need during your luteal phase'
    ],
    captionDraft: 'Understanding your cycle shouldn\'t require a medical degree. 🌸 Here are 3 simple shifts to support your body naturally. From sleep habits to key nutrients like Magnesium and Ashwagandha in our Hormone Balance blend, small changes can lead to big relief.',
    hashtags: ['#HormonalHealth', '#AuraWellness', '#WomenSupplement', '#LutealPhase', '#CycleSyncing'],
    cta: 'Link in bio to shop Hormone Balance & save 15%',
    complianceNote: 'Disclaimer: These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, or cure any disease.'
  },
  {
    id: 'post_2',
    platform: 'TikTok',
    day: 5,
    title: 'Morning Routine Greens GRWM',
    hooks: [
      'POV: You finally found a greens powder that doesn\'t taste like grass',
      'My 5-minute debloating morning routine',
      'A nutritionist\'s guide to a flat stomach by noon'
    ],
    captionDraft: 'No grass, no chalk, just delicious superfoods. 🥬 Sip along with me while we talk about gut health and how Daily Greens kickstarts my digestion every single morning. #guthealth #greenspowder #grwm #morningroutine',
    hashtags: ['#guthealth', '#greenspowder', '#grwm', '#morningroutine', '#bloatingrelief'],
    cta: 'Tap the TikTok shop link below to grab yours',
    complianceNote: 'Contains organic wheatgrass, barley grass, and alfalfa. Ensure allergen warnings are visible.'
  },
  {
    id: 'post_3',
    platform: 'Pinterest',
    day: 8,
    title: 'Cycle Syncing Food Infographic',
    hooks: [
      'The Ultimate Guide to Cycle Syncing Foods',
      'What to eat during menstrual, follicular, ovulatory, and luteal phases',
      'Cycle syncing meal prep idea sheet'
    ],
    captionDraft: 'Feed your cycle what it actually needs. Save this infographic for your next grocery run to cycle sync your pantry like a pro. Pair with our cycle support blends for optimal balance.',
    hashtags: ['#CycleSyncing', '#MealPrep', '#HealthyEating', '#CycleDiet', '#WomensHealth'],
    cta: 'Click through to read our full guide',
    complianceNote: 'Educational content. Avoid specific therapeutic claims.'
  },
  {
    id: 'post_4',
    platform: 'Instagram',
    day: 12,
    title: 'Customer Review Carousels',
    hooks: [
      'Why 10,000+ women are obsessed with Aura...',
      'Wait until you see Kaitlyn\'s 30-day skin transformation',
      'Before & After: Daily Greens gut reset'
    ],
    captionDraft: 'Real results from real women. 💚 We are humbled by the stories you share with us every single day. Slide through to read how Aura Wellness blends are helping women reclaim their energy, clear their skin, and banish bloating.',
    hashtags: ['#AuraWellness', '#CustomerReview', '#GutHealthResults', '#HormoneBalancing'],
    cta: 'Read more reviews on our website (link in bio)',
    complianceNote: 'Must use verbatim verified reviews only. Include disclaimer for individual results.'
  },
  {
    id: 'post_5',
    platform: 'TikTok',
    day: 15,
    title: 'Sleep Gummy Flavor Test React',
    hooks: [
      'Blind taste testing our new Sleep Restore gummies',
      'Can these actually put me to sleep in 20 minutes?',
      'Husband reacts to sleep supplements'
    ],
    captionDraft: 'Snoozing is serious business. 😴 Let\'s see if these tart cherry and melatonin gummies can knock out a chronic night owl. #sleepgummies #sleephacks #bedtimeroutine #melatonin',
    hashtags: ['#sleepgummies', '#sleephacks', '#bedtimeroutine', '#melatonin', '#insomnia'],
    cta: 'Shop Sleep Restore on TikTok Shop now',
    complianceNote: 'Do not recommend for pregnant/nursing mothers. Melatonin dosage warning should be clear in product page.'
  },
  {
    id: 'post_6',
    platform: 'Pinterest',
    day: 18,
    title: 'Summer Debloating Guide Pin',
    hooks: [
      '5 ways to quickly debloat before a beach day',
      'How to stop water retention in hot weather',
      'Gut Reset summer guide'
    ],
    captionDraft: 'Feeling heavy in the heat? ☀️ Follow these 5 quick hacks to support lymphatic drainage and soothe your digestion so you feel your best all summer long.',
    hashtags: ['#SummerHealth', '#Debloating', '#GutHealth', '#BeachHacks', '#WellnessTips'],
    cta: 'Shop our Summer Gut Reset Bundle',
    complianceNote: 'Ensure claims are focused on transient bloating relief, not clinical edema.'
  },
  {
    id: 'post_7',
    platform: 'Instagram',
    day: 22,
    title: 'Ingredients Breakdown: Ashwagandha',
    hooks: [
      'The ancient adaptogen that reduces stress in 30 days',
      'Why we put KSM-66 Ashwagandha in our cycle blends',
      'Ashwagandha vs high cortisol'
    ],
    captionDraft: 'Meet KSM-66 Ashwagandha: the premium organic adaptogen designed to support your adrenal glands, regulate stress responses, and bring calm to your cycle. Here is the science of how it works.',
    hashtags: ['#Ashwagandha', '#Adaptogen', '#CortisolControl', '#StressRelief', '#AuraScience'],
    cta: 'Shop the Adrenal Support Bundle',
    complianceNote: 'Refer to clinical studies for KSM-66 only. Avoid claiming to treat diagnosed anxiety disorders.'
  },
  {
    id: 'post_8',
    platform: 'TikTok',
    day: 26,
    title: 'Supplement Storage Cabinet Prep',
    hooks: [
      'Restock my wellness cabinet with me',
      'Organizational porn: supplement edition',
      'How to keep your vitamins fresh and potent'
    ],
    captionDraft: 'Restocking the essentials. 🤍 Organise my daily Aura wellness drawer with me. What is your go-to supplement? #supplementcabinet #restock #aesthetic #organization',
    hashtags: ['#supplementcabinet', '#restock', '#aesthetic', '#organization', '#wellnessrestock'],
    cta: 'Build your custom drawer bundle & save 20%',
    complianceNote: 'Keep storage advice standard (dry, cool place out of direct sunlight).'
  }
];

export const contentTrends = [
  {
    id: 'trend_1',
    topic: 'Cortisol Face & Bloat',
    platform: 'TikTok / IG Reels',
    reach: '4.8M views this week',
    description: 'Creators are posting videos detailing how elevated stress hormones (cortisol) cause water retention and facial swelling, sharing their morning routine resets.',
    recommendation: 'Launch an "Anti-Cortisol Morning Routine" Campaign featuring Hormone Balance + Daily Greens. Hook idea: "If your face looks swollen when you wake up, read this..."'
  },
  {
    id: 'trend_2',
    topic: 'Luteal Phase Grocery Hauls',
    platform: 'TikTok',
    reach: '2.5M views this week',
    description: 'High engagement on videos showing what to buy during the luteal phase to curb cravings and manage mood swings (cycle syncing foods).',
    recommendation: 'Post a "What to Buy in Your Luteal Phase" slideshow on IG/Pinterest. Feature a grocery bag containing seeds, dark chocolate, sweet potatoes, and Aura Hormone Balance.'
  },
  {
    id: 'trend_3',
    topic: 'ASMR Supplement Restocks',
    platform: 'TikTok / YouTube Shorts',
    reach: '1.2M views this week',
    description: 'Satisfying ASMR restocking videos showing customers emptying supplement refill pouches into sleek glass jars.',
    recommendation: 'Produce a high-production ASMR video of Aura refill pouches being poured into custom glass canisters. Use this to promote our Eco-Refill Subscription model.'
  }
];
