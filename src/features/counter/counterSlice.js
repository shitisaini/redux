import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCount } from './fetchCount'


export const addAmountAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount) => {
        const response = await fetchCount(amount);
        return response.data;
    }
);

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        status: 'done',
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        multiplyByAmount: (state, action) => {
            state.value *= action.payload
        },
        incrementAsync: (state, action) => {
            state.value += action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addAmountAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addAmountAsync.fulfilled, (state, action) => {
                state.status = 'done';
                state.value += action.payload;
            })
            .addCase(addAmountAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
    selectors: {
        selectCount: state => state.counter.value,
        selectStatus: state => state.counter.status,
    }
})

export const { increment, decrement, incrementByAmount, multiplyByAmount, } = counterSlice.actions

export default counterSlice.reducer