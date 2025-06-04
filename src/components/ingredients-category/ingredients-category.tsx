import { forwardRef, useMemo } from 'react';
import { TIngsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngsCategoryUI } from '../ui/ingredients-category';

export const IngsCategory = forwardRef<HTMLUListElement, TIngsCategoryProps>(
  ({ title, titleRef, ingredients }, ref) => {
    const BurgerConstruct = {
      bun: {
        _id: ''
      },
      ingredients: []
    };

    const ingredientsCounters = useMemo(() => {
      const { bun, ingredients } = BurgerConstruct;
      const counters: { [key: string]: number } = {};
      ingredients.forEach((ingredient: TIngredient) => {
        if (!counters[ingredient._id]) counters[ingredient._id] = 0;
        counters[ingredient._id]++;
      });
      if (bun) counters[bun._id] = 2;
      return counters;
    }, [BurgerConstruct]);

    return (
      <IngsCategoryUI
        title={title}
        titleRef={titleRef}
        ingredients={ingredients}
        ingredientsCounters={ingredientsCounters}
        ref={ref}
      />
    );
  }
);
