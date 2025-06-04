import React, { FC, memo } from 'react';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

import styles from './order-info.module.css';

import { OrderInfUIProps } from './type';
import { OrderStat } from '@components';

export const OrderInfUI: FC<OrderInfUIProps> = memo(({ OrderInf }) => (
  <div className={styles.wrap}>
    <h3 className={`text text_type_main-medium  pb-3 pt-10 ${styles.header}`}>
      {OrderInf.name}
    </h3>
    <OrderStat status={OrderInf.status} />
    <p className={`text text_type_main-medium pt-15 pb=6`}>Состав:</p>
    <ul className={`${styles.list} mb-8`}>
      {Object.values(OrderInf.ingredientsInfo).map((item, index) => (
        <li className={`pb-4 pr-6 ${styles.item}`} key={index}>
          <div className={styles.img_wrap}>
            <div className={styles.border}>
              <img
                className={styles.img}
                src={item.image_mobile}
                alt={item.name}
              />
            </div>
          </div>
          <span className='text text_type_main-default pl-4'>{item.name}</span>
          <span
            className={`text text_type_digits-default pl-4 pr-4 ${styles.quantity}`}
          >
            {item.count} x {item.price}
          </span>
          <CurrencyIcon type={'primary'} />
        </li>
      ))}
    </ul>
    <div className={styles.bottom}>
      <p className='text text_type_main-default text_color_inactive'>
        <FormattedDate date={OrderInf.date} />
      </p>
      <span className={`text text_type_digits-default pr-4 ${styles.total}`}>
        {OrderInf.total}
      </span>
      <CurrencyIcon type={'primary'} />
    </div>
  </div>
));
