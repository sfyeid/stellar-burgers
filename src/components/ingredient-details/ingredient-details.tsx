import { FC } from 'react';
import { Preloader, IngDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/ingredients-slice';

export const IngDetails: FC = () => {
  const { id } = useParams();

  const ingredient = useSelector(selectIngredients);
  const ingredientData = ingredient.find((ingredient) => ingredient._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngDetailsUI ingredientData={ingredientData} />;
};
