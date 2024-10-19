export const productIcons = [
    '📊', '📈', '🔍', '💻', '🚀', '⚡', '📱', '💡', '🔧', '⚙️', 
    '🛠️', '📡', '🔮', '📲', '🎯', '🎨', '🔔', '💬', '📑', '🗂️'
  ];
  
  export const getProductIcon = (productId: string): string => {
    const index = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return productIcons[index % productIcons.length];
  };