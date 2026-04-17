import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Newspaper, Cpu, Globe, Palette, DollarSign, HeartPulse, Film, Gamepad2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

const categories: Category[] = [
  { id: 'tech', name: '科技', icon: <Cpu size={32} />, count: 128, color: 'from-blue-500 to-cyan-500' },
  { id: 'world', name: '国际', icon: <Globe size={32} />, count: 96, color: 'from-green-500 to-emerald-500' },
  { id: 'culture', name: '文化', icon: <Palette size={32} />, count: 64, color: 'from-purple-500 to-pink-500' },
  { id: 'finance', name: '财经', icon: <DollarSign size={32} />, count: 82, color: 'from-yellow-500 to-orange-500' },
  { id: 'health', name: '健康', icon: <HeartPulse size={32} />, count: 45, color: 'from-red-500 to-rose-500' },
  { id: 'entertainment', name: '娱乐', icon: <Film size={32} />, count: 156, color: 'from-indigo-500 to-violet-500' },
  { id: 'sports', name: '体育', icon: <Gamepad2 size={32} />, count: 73, color: 'from-teal-500 to-cyan-500' },
  { id: 'general', name: '综合', icon: <Newspaper size={32} />, count: 234, color: 'from-gray-500 to-slate-500' },
];

const Categories: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/?category=${categoryId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">新闻分类</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <div className={`bg-gradient-to-br ${category.color} rounded-xl p-6 text-white`}>
              <div className="mb-4">{category.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
              <p className="text-sm opacity-80">{category.count} 篇文章</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
