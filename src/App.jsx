import React, { useEffect, useState } from "react";
import { searchMeals, fetchMealById, getFilters } from "./services/api";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : {};
  });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ categories: [], areas: [], ingredients: [] });
  const [selectedFilter, setSelectedFilter] = useState({ type: "", value: "" });
  const [tab, setTab] = useState("all"); // "all" or "favorites"

  useEffect(() => {
    getFilters().then(setFilters);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (tab === "all") loadMeals();
    }, 400);
    return () => clearTimeout(timer);
  }, [query, selectedFilter, tab]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  async function loadMeals() {
    setLoading(true);
    const meals = await searchMeals({
      query,
      filterType: selectedFilter.type,
      filterValue: selectedFilter.value,
    });
    setRecipes(meals);
    setLoading(false);
  }

  const toggleFav = (r) =>
    setFavorites((f) => {
      const copy = { ...f };
      if (copy[r.id]) delete copy[r.id];
      else copy[r.id] = r;
      return copy;
    });

  const openRecipe = async (r) => {
    const full = await fetchMealById(r.id);
    setSelected(full);
  };

  const favList = Object.values(favorites);

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">🍳 Recipe Ideas</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div role="tablist" className="tabs tabs-boxed">
          <button
            role="tab"
            className={`tab ${tab === "all" ? "tab-active" : ""}`}
            onClick={() => setTab("all")}
          >
            All Recipes
          </button>
          <button
            role="tab"
            className={`tab ${tab === "favorites" ? "tab-active" : ""}`}
            onClick={() => setTab("favorites")}
          >
            Favorites ({favList.length})
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      {tab === "all" && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-primary w-full sm:flex-1"
          />
          <select
            className="select select-bordered select-neutral"
            value={
              selectedFilter.type && selectedFilter.value
                ? `${selectedFilter.type}:${selectedFilter.value}`
                : ""
            }
            onChange={(e) => {
              const [type, value] = e.target.value.split(":");
              setSelectedFilter({ type, value });
            }}
          >
            <option value="">Filter by...</option>
            {filters.categories.map((c) => (
              <option key={c} value={`c:${c}`}>
                Category: {c}
              </option>
            ))}
            {filters.areas.map((a) => (
              <option key={a} value={`a:${a}`}>
                Area: {a}
              </option>
            ))}
            {filters.ingredients.map((i) => (
              <option key={i} value={`i:${i}`}>
                Ingredient: {i}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Global Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center mt-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Recipe Grid */}
      {!loading && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tab === "all" && recipes.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              <p>No results found. Try another search or filter.</p>
            </div>
          )}

          {(tab === "all" ? recipes : favList).map((r) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              onOpen={() => openRecipe(r)}
              onToggleFav={() => toggleFav(r)}
              isFav={!!favorites[r.id]}
            />
          ))}

          {tab === "favorites" && favList.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              <p>No favorites yet. Tap the heart on a recipe to save it!</p>
            </div>
          )}
        </div>
      )}

      {selected && <RecipeModal recipe={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
