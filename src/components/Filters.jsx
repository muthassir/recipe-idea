import React, { useEffect, useState } from "react";
import axios from "axios";

function Filters({ filters, setFilters }) {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [catRes, areaRes, ingRes] = await Promise.all([
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list"),
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list"),
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list"),
        ]);

        const catData = catRes.data;
        const areaData = areaRes.data;
        const ingData = ingRes.data;

        setCategories(catData.meals?.map((m) => m.strCategory) || []);
        setAreas(areaData.meals?.map((m) => m.strArea) || []);
        setIngredients(ingData.meals?.map((m) => m.strIngredient) || []);
      } catch (err) {
        console.error("Failed to load filter data", err);
      }
    }

    loadOptions();
  }, []);

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Category filter */}
      <select
        value={filters.category}
        onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
        className="select select-bordered w-full"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Area filter */}
      <select
        value={filters.area}
        onChange={(e) => setFilters((f) => ({ ...f, area: e.target.value }))}
        className="select select-bordered w-full"
      >
        <option value="">All Areas</option>
        {areas.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>

      {/* Ingredient filter */}
      <select
        value={filters.ingredient}
        onChange={(e) => setFilters((f) => ({ ...f, ingredient: e.target.value }))}
        className="select select-bordered w-full"
      >
        <option value="">All Ingredients</option>
        {ingredients.slice(0, 50).map((ing) => (
          <option key={ing} value={ing}>
            {ing}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters
