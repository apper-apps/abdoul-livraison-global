import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex overflow-x-auto space-x-3 pb-2 px-1 scrollbar-hide">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => onCategoryChange("all")}
        className="flex-shrink-0"
      >
        <Badge
          variant={selectedCategory === "all" ? "primary" : "default"}
          className="px-4 py-2 cursor-pointer transition-all duration-200 hover:scale-105"
        >
          Tous
        </Badge>
      </motion.button>
      
      {categories.map((category) => (
        <motion.button
          key={category}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange(category)}
          className="flex-shrink-0"
        >
          <Badge
            variant={selectedCategory === category ? "primary" : "default"}
            className="px-4 py-2 cursor-pointer transition-all duration-200 hover:scale-105"
          >
            {category}
          </Badge>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;