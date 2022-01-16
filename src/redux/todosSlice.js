import { createSlice } from "@reduxjs/toolkit"

const INIT = [];

export const todosSlice = createSlice({
    name: 'todosSlice',
    initialState: INIT,
    reducers: {
        pushTask: (state, actions) => {
            const { payload } = actions;
            return [payload, ...state];
        },
        //delete target with certain index
        deleteTask: (state, actions) => {
            const id = actions.payload;
            const newArr = state.filter(el => el.id !== id);
            return [...newArr];
        },
        //change isFinish status
        setStatus: (state, actions) => {
            const { id, time } = actions.payload;
            
            state.forEach(el => {
                if (el.id === id) {
                    if (el.isFinish) {
                        el.isFinish = false;
                        el.finishAt = null;
                    } else {
                        el.isFinish = true;
                        el.finishAt = time;
                    }
                }
                return el
            })

            return state;
        },
        //if there is data in local side, than initialize by local storage
        initialByLocal: (state, actions) => {
            const { payload } = actions;
            return [...payload];
        },
        //clear all
        clearTask: (state, actions) => {
            return INIT
        }
    }
})

export const { pushTask, deleteTask, clearTask, setStatus, initialByLocal } = todosSlice.actions;

export default todosSlice.reducer;