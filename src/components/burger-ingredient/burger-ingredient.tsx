import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngUI } from '@ui';
import { TBurgerIngProps } from './type';
import { useDispatch } from '../../services/store';
import { addBunBuilder, addItemBuilder } from '../../slices/builder-slice';
import { v4 as uuid4 } from 'uuid';

export const BurgerIng: FC<TBurgerIngProps> = memo(({ ingredient, count }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (ingredient.type === 'bun') {
      dispatch(addBunBuilder(ingredient));
    } else {
      const newIngredient = {
        ...ingredient,
        id: uuid4()
      };
      dispatch(addItemBuilder(newIngredient));
    }
  };

  return (
    <BurgerIngUI
      ingredient={ingredient}
      count={count}
      locationState={{ background: location }}
      handleAdd={handleAdd}
    />
  );
});
