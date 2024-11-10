import { Instagram, Facebook, Twitter } from 'lucide-react';
import { ReactNode } from 'react';

export const getPlatformIcon = (platform: string): ReactNode => {
  switch (platform) {
    case 'Instagram': return <Instagram className="h-4 w-4" />;
    case 'Facebook': return <Facebook className="h-4 w-4" />;
    case 'Twitter': return <Twitter className="h-4 w-4" />;
    default: return null;
  }
};