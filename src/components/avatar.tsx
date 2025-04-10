interface AvatarProps {
  initials: string;
  index: number;
}

export function Avatar({ initials, index }: AvatarProps) {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-indigo-500',
  ];
  
  const colorClass = colors[index % colors.length];
  
  return (
    <div className={`h-10 w-10 rounded-full ${colorClass} flex items-center justify-center text-white font-medium text-sm`}>
      {initials}
    </div>
  );
} 