import type { Post } from '../types/post';

export const initialPosts: Post[] = [
  {
    id: 1,
    dateToPost: '2023-06-15',
    driveLink: 'https://drive.google.com/file1',
    platforms: ['Instagram', 'Facebook'],
    media: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=200&h=200',
    caption: 'Check out our new product!',
    designApproved: true,
    contentDone: true,
    status: 'Approved by client',
    posted: true,
    company: 'TechCorp',
    comments: [],
    needsAttention: false
  },
  {
    id: 2,
    dateToPost: '2023-06-18',
    driveLink: 'https://drive.google.com/file2',
    platforms: ['Twitter'],
    media: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=200&h=200',
    caption: 'Join us for our upcoming webinar!',
    designApproved: true,
    contentDone: false,
    status: 'Pending',
    posted: false,
    company: 'MarketingPro',
    comments: [],
    needsAttention: false
  },
  {
    id: 3,
    dateToPost: '2023-06-20',
    driveLink: 'https://drive.google.com/file3',
    platforms: ['Instagram'],
    media: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=200&h=200',
    caption: 'Summer sale starts now!',
    designApproved: false,
    contentDone: true,
    status: 'Pending',
    posted: false,
    company: 'TechCorp',
    comments: [],
    needsAttention: false
  },
  {
    id: 4,
    dateToPost: '2023-06-25',
    driveLink: 'https://drive.google.com/file4',
    platforms: ['Facebook', 'Twitter'],
    media: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=200&h=200',
    caption: 'New blog post: 10 tips for productivity',
    designApproved: true,
    contentDone: true,
    status: 'Approved by client',
    posted: false,
    company: 'MarketingPro',
    comments: [],
    needsAttention: false
  },
];