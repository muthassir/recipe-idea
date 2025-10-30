import React from "react";

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;
  return (
    <dialog id="recipe_modal" className="modal modal-open">
      <div className="modal-box max-w-3xl h-5/6 overflow-y-auto">
        <h3 className="font-bold text-xl mb-2">{recipe.title}</h3>
        <img src={recipe.image} alt={recipe.title} className="rounded-lg mb-3" />
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
