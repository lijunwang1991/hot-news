import React from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onSelect: (categoryId: string) => void;
  multiSelect?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onSelect,
  multiSelect = false
}) => {
  const handleClick = (categoryId: string) => {
    onSelect(categoryId);
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        return (
          <motion.button
            key={category.id}
            onClick={() => handleClick(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isSelected
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: isSelected ? '#3b82f6' : '#f3f4f6',
              color: isSelected ? '#ffffff' : '#374151'
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
