import React from "react";

const RecipeCard = ({ recipe, onOpen, onToggleFav, isFav }) => {
  return (
    <div className="card bg-neutral shadow-lg hover:shadow-xl transition">
      <figure className="h-48">
        <img src={recipe.image} alt={recipe.title} className="object-cover w-full h-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.title}</h2>
        <div className="card-actions justify-between mt-3">
          <button className="btn btn-primary btn-sm" onClick={onOpen}>
            View
          </button>
          <button className="btn btn-ghost btn-sm" onClick={onToggleFav}>
            {isFav ? "💖" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
