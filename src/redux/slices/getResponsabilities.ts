import { createSlice, createAsyncThunk, Reducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { ResponsabilitiesInterface } from '@/types/responsabilities';
import { PayloadAction } from '@reduxjs/toolkit'; 

const initialState: ResponsabilitiesInterface = {
    responsabilities: [],
    loading: false,
    error: '',
    success: false,
};

export const fetchResponsabilities = createAsyncThunk(
    'responsabilities/fetchResponsabilities',
    async (_, thunkAPI) => {
        try {
            const response = await axios.post('http://ec2-13-51-194-147.eu-north-1.compute.amazonaws.com/api/v1/graphql', {
                query: `
                    query GetResponsibilities {
                    getResponsibilities {
                        data {
                            name
                            id
                        }
                    }
                    }
                `,
            });

            const responsabilities = response.data.data.getResponsibilities.data;
            return responsabilities;
        } catch (error) {
            const Error = error as Error;
            return thunkAPI.rejectWithValue(Error.message || 'Something went wrong');
        }
    }
);

const responsabilitiesSlice = createSlice({
    name: 'responsabilities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResponsabilities.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.success = false;
            })
            .addCase(fetchResponsabilities.fulfilled, (state, action) => {
                state.loading = false;
                state.responsabilities = action.payload;
                state.success = true;
            })
            .addCase(fetchResponsabilities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export default responsabilitiesSlice.reducer as Reducer<ResponsabilitiesInterface, PayloadAction>;
