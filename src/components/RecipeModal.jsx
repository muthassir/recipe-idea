import { useState } from "react";

const RecipeModal = ({ recipe, onClose }) => {
    const [loaded, setLoaded] = useState(false);

  if (!recipe) return null;
  return (
    <dialog id="recipe_modal" className="modal modal-open  bg-white/6 backdrop-blur-md border border-white/8 
        text-white shadow-2xl">
      <div className="modal-box max-w-3xl h-5/6 overflow-y-auto bg-neutral text-white">
        <h3 className="font-bold text-xl mb-2">{recipe.title}</h3>
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
        <p className="whitespace-pre-wrap text-sm mb-3">{recipe.instructions}</p>
        {recipe.sourceUrl && (
          <a href={recipe.sourceUrl} target="_blank" className="link link-primary block mb-2">
            View Source
          </a>
        )}
        {recipe.youtube && (
          <a href={recipe.youtube} target="_blank" className="link link-error block">
            Watch YouTube Tutorial
          </a>
        )}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
};

export default RecipeModal;
