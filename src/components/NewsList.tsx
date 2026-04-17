import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, List, ChevronDown } from 'lucide-react';
import { NewsItem } from '../types';
import NewsCard from './NewsCard';

interface NewsListProps {
  news: NewsItem[];
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ news, onLoadMore, hasMore = false }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Grid3X3 size={20} />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <List size={20} />
        </button>
      </div>

      <motion.div
        layout
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'flex flex-col gap-4'
        }
      >
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <NewsCard news={item} viewMode={viewMode} />
          </motion.div>
        ))}
      </motion.div>

      {hasMore && onLoadMore && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLoadMore}
          className="w-full py-3 flex items-center justify-center gap-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <span>加载更多</span>
          <ChevronDown size={18} />
        </motion.button>
      )}
    </div>
  );
};

export default NewsList;
