import {FaHeart} from "react-icons/fa"
import { useState } from "react";

const RecipeCard = ({ recipe, onOpen, onToggleFav, isFav }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="card bg-white text-neutral shadow-lg hover:shadow-xl transition">
      <figure className="h-48">
        <img
  src={recipe.image}
  alt={recipe.title}
  onLoad={() => setLoaded(true)}
  onError={() => setLoaded(true)} 
  className={`rounded-lg mb-3 object-cover w-full transition-opacity duration-500 ${
    loaded ? "opacity-100" : "opacity-0"
  }`}
/>
{!loaded && <div className="w-full h-48 bg-gray-700 animate-pulse rounded-lg" />}

      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.title}</h2>
        <div className="card-actions justify-between mt-3">
          <button className="btn btn-neutral btn-sm" onClick={onOpen}>
            View
          </button>
          <button className="btn btn-error rounded-full btn-sm" onClick={onToggleFav}>
            {isFav ? <FaHeart /> : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
