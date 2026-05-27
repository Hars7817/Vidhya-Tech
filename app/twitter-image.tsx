import { ImageResponse } from 'next/og';
import { SocialShareImage } from '@/lib/social-image';

export const alt =
  'Vidhya Tech - Web Development, AI Automation and Digital Growth';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(<SocialShareImage />, {
    ...size,
  });
}
