import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '@store';
import { getIngredients } from '../../services/slices/ingredients';

export const IngredientDetails: FC = () => {
  /** TODO(done): взять переменную из стора */
  const ingredients = useSelector(getIngredients);
  const params = useParams();
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
