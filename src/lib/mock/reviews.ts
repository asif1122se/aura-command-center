export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  text: string;
  productName: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  date: string;
  status: 'pending' | 'amplified';
}

export const reviewsMetrics = {
  averageRating: 4.7,
  totalReviews: 12480,
  loyaltyRevenue: 284500, // Year-to-date or monthly
  referralSignups: 942,
};

export const mockReviews: ReviewItem[] = [
  {
    id: 'rev_1',
    author: 'Kaitlyn S.',
    rating: 5,
    text: 'I have tried every greens powder under the sun and Daily Greens is by far the best tasting. It does not have that grassy aftertaste at all! Plus, my bloating has completely gone down after 2 weeks of using it daily.',
    productName: 'Daily Greens & Superfoods',
    sentiment: 'positive',
    date: '10 mins ago',
    status: 'pending',
  },
  {
    id: 'rev_2',
    author: 'Sarah M.',
    rating: 5,
    text: 'Hormone Balance has changed the game for my hormonal acne. I noticed a difference in my skin texture in just one cycle. Absolutely love this stuff and will be ordering the monthly subscription next!',
    productName: 'Hormone Balance Support',
    sentiment: 'positive',
    date: '1 hour ago',
    status: 'pending',
  },
  {
    id: 'rev_3',
    author: 'Jessica P.',
    rating: 3,
    text: 'The Sleep Restore gummies work great for putting me to sleep, but the new batch tastes a bit too sour/medicinal compared to my last order. Hopefully, they can fix the taste back to what it was.',
    productName: 'Sleep Restore Gummies',
    sentiment: 'neutral',
    date: '3 hours ago',
    status: 'pending',
  },
  {
    id: 'rev_4',
    author: 'Melissa B.',
    rating: 5,
    text: 'Honestly, I was skeptical about Collagen Glow, but my nails are growing faster than ever and my joints feel way better during workouts. Will recommend to my friends!',
    productName: 'Collagen Glow Peptides',
    sentiment: 'positive',
    date: '6 hours ago',
    status: 'pending',
  },
  {
    id: 'rev_5',
    author: 'Taylor R.',
    rating: 5,
    text: 'Gut Reset is literally my holy grail. I drink it every morning. Highly recommend if you have a sensitive stomach like me.',
    productName: 'Gut Reset Pre/Probiotic',
    sentiment: 'positive',
    date: '1 day ago',
    status: 'pending',
  },
  {
    id: 'rev_6',
    author: 'Hannah G.',
    rating: 2,
    text: 'I received the Immunity Boost elixir, but the bottle cap was cracked and it leaked all over the box. Customer support replaced it quickly, but packaging could be improved.',
    productName: 'Immunity Boost Elixir',
    sentiment: 'negative',
    date: '2 days ago',
    status: 'pending',
  }
];
