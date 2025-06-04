import { FC, useEffect, useMemo } from 'react';
import { Preloader, OrderInfUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/ingredients-slice';
import { fetchOrderNumber, orderDataSelector } from '../../slices/order-slice';

export const OrderInf: FC = () => {
  const { number = '' } = useParams<{ number: string }>();

  const dispatch = useDispatch();
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  const orderData = useSelector(orderDataSelector(number));

  useEffect(() => {
    if (!orderData) {
      dispatch(fetchOrderNumber(Number(number)));
    }
  }, [dispatch, orderData, number]);
  const OrderInf = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!OrderInf) {
    return <Preloader />;
  }

  return <OrderInfUI OrderInf={OrderInf} />;
};
