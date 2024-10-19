import { ColorOption } from "./types/products";


export const colorOptions: ColorOption[] = [
  { name: 'Purple', hex: '#8B5CF6' },
  { name: 'Gray', hex: '#9CA3AF' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Green', hex: '#10B981' },
  { name: 'Yellow', hex: '#F59E0B' },
];

export const productIcons = [
  '📊', '📈', '🔍', '💻', '🚀', '⚡', '📱', '💡', '🔧', '⚙️', 
  '🛠️', '📡', '🔮', '📲', '🎯', '🎨', '🔔', '💬', '📑', '🗂️'
];

export const getProductIcon = (productId: string): string => {
  const index = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return productIcons[index % productIcons.length];
};