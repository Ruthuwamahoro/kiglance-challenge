import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserInterface } from '@/types/users';

const initialState: UserInterface = {
    users: [],
    loading: false,
    error: '',
    success: false,
};

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (userId: string, thunkAPI) => {
        try {
            const response = await axios.post('http://ec2-13-51-194-147.eu-north-1.compute.amazonaws.com/api/v1/graphql', {
                query: `
                  query GetUser($input: GetOneInput!) {
                    getUser(input: $input) {
                      id
                      firstName
                      lastName
                      email
                      isVerified
                      createdAt
                      updatedAt
                      authStrategy,
                        profile {
                            photo
                        }
                    }
                  }
                `,
                variables: {
                    input: {
                        where: {
                            id: userId,
                        },
                    },
                },
            });

            const user = response.data.data.getUser;


            return user;
        } catch (error) {
            const Error = error as Error;
            return thunkAPI.rejectWithValue(Error.message || 'Something went wrong');
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.success = false;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.users = [action.payload];
                state.success = true;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            });
    },
});

export default usersSlice.reducer;
