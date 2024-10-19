import { createSlice, createAsyncThunk, Reducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductInterface } from '@/types/products';
import { PayloadAction } from '@reduxjs/toolkit'; 

const initialState: ProductInterface = {
    products: [],
    loading: false,
    error: '',
    success: false,
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, thunkAPI) => {
        try {
            const response = await axios.post('http://ec2-13-51-194-147.eu-north-1.compute.amazonaws.com/api/v1/graphql', {
                query: `
                    query GetProducts {
                    getProducts {
                        data {
                        name
                        id
                        }
                    }
                    }
                `,
            });

            const products = response.data.data.getProducts.data;
            return products;
        } catch (error) {
            const Error = error as Error;
            return thunkAPI.rejectWithValue(Error.message || 'Something went wrong');
        }
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.success = false;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.success = true;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export default productsSlice.reducer as Reducer<ProductInterface, PayloadAction>;
