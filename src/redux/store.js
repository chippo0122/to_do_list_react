import { configureStore } from "@reduxjs/toolkit"
import todosSlice from "./todosSlice"
import messageSlice from "./messageSlice"

export const store = configureStore({
    reducer: {
        todos: todosSlice,
        messages: messageSlice
    }
})