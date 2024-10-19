import { ProductInterface } from '@/types/products';
import { ResponsabilitiesInterface } from '@/types/responsabilities';
import { UserInterface } from '@/types/users';
import { createAction } from '@reduxjs/toolkit';

export const allUsers = createAction<UserInterface>('users/fetchAllUsers');
export const allResponsabilities = createAction<ResponsabilitiesInterface>('responsabilities/fetchResponsabilities')
export const allProducts = createAction<ProductInterface>('products/fetchProducts')
export const allProductsTags = createAction<ProductInterface>('productsTags/fetchProductsTags')
