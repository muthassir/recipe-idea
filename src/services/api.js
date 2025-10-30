const BASE = "https://www.themealdb.com/api/json/v1/1";

export async function searchMeals({ query, filterType, filterValue } = {}) {
  let url;
  if (query) {
    url = `${BASE}/search.php?s=${encodeURIComponent(query)}`;
  } else if (filterType && filterValue) {
    url = `${BASE}/filter.php?${filterType}=${encodeURIComponent(filterValue)}`;
  } else {
    url = `${BASE}/search.php?s=chicken`; // default
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("API Error");
  const data = await res.json();
  const meals = data.meals || [];

  return meals.map((m) => ({
    id: m.idMeal,
    title: m.strMeal,
    image: m.strMealThumb,
  }));
}

export async function fetchMealById(id) {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  const meal = (data.meals && data.meals[0]) || null;
  if (!meal) throw new Error("Meal not found");
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    instructions: meal.strInstructions,
    sourceUrl: meal.strSource,
    youtube: meal.strYoutube,
  };
}

export async function getFilters() {
  const [cats, areas, ingredients] = await Promise.all([
    fetch(`${BASE}/list.php?c=list`).then((r) => r.json()),
    fetch(`${BASE}/list.php?a=list`).then((r) => r.json()),
    fetch(`${BASE}/list.php?i=list`).then((r) => r.json()),
  ]);
  return {
    categories: cats.meals?.map((c) => c.strCategory) || [],
    areas: areas.meals?.map((a) => a.strArea) || [],
    ingredients: ingredients.meals?.slice(0, 50).map((i) => i.strIngredient) || [],
  };
}

export { searchMeals as searchRecipes, fetchMealById as fetchRecipeById };
