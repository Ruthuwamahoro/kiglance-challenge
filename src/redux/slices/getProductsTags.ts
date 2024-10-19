import { createSlice, createAsyncThunk, Reducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductTagsInterface } from '@/types/products';
import { PayloadAction } from '@reduxjs/toolkit'; 

const initialState: ProductTagsInterface = {
    products: [],
    loading: false,
    error: '',
    success: false,
};

export const fetchProductsTags = createAsyncThunk(
    'productsTags/fetchProductsTags',
    async (_, thunkAPI) => {
        try {
            const response = await axios.post('http://ec2-13-51-194-147.eu-north-1.compute.amazonaws.com/api/v1/graphql', {
                query: `
                    query GetProducts {
                        getProductTags {
                            data {
                            name
                            id
                            }
                        }
                    }
                `,
            });

            const productsTags = response.data.data.getProductTags.data;
            console.log("productsTAGS", productsTags)
            return productsTags;
        } catch (error) {
            const Error = error as Error;
            return thunkAPI.rejectWithValue(Error.message || 'Something went wrong');
        }
    }
);

export const productsTagsSlice = createSlice({
    name: 'productsTags',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsTags.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.success = false;
            })
            .addCase(fetchProductsTags.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.success = true;
            })
            .addCase(fetchProductsTags.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export default productsTagsSlice.reducer as Reducer<ProductTagsInterface, PayloadAction>;
