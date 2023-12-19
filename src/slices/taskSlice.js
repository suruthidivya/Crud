import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    tasksList:[],
    selectedTask: {},
    isLoading: false,
    error:''
}

const API_URL = 'https://fakestoreapi.com/products';

//GET
export const getTasksfromServer = createAsyncThunk(
    "tasks/getTasksfromServer",
    async (_,{rejectWithValue}) => {
        const response = await fetch(API_URL + '?limit=5');
        if(response.ok) {
            
            const jsonResponse = await response.json();
            return jsonResponse
        } else {
           
            return rejectWithValue({error:'No tasks found'})
        }

    }
)

//POST
export const addTaskToServer = createAsyncThunk(
    "tasks/addTaskToServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            }
        }
        const response = await fetch(API_URL, options);
        if(response.ok) {
            
            const jsonResponse = await response.json();
           
            return jsonResponse
        } else {
           
            return rejectWithValue({error:'Task not added'})
        }

    }
)


//PATCH
export const updateTaskInServer = createAsyncThunk(
    "tasks/updateTaskInServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers: {
                "Content-type":"application/json; charset=UTF-8"
            }
        }
        const response = await fetch(API_URL + '/' + task.id, options);
        if(response.ok) {
            console.log('success');
            const jsonResponse = await response.json();
            return jsonResponse
        } else {
           
            return rejectWithValue({error:'Task not updated'})
        }

    }
)

//DELETE 
export const delTaskFromServer = createAsyncThunk(
    "tasks/delTakFromServer",
    async (task,{rejectWithValue}) => {
        const options = {
            method: 'DELETE',
        }
        const response = await fetch(API_URL + '/' + task.id, options);
        if(response.ok) {
            console.log('success');
            const jsonResponse = await response.json();
            return jsonResponse
        } else {
           
            return rejectWithValue({error:'Task not deleted'})
        }

    }
)


const taskSlice = createSlice({
    name:"tasksSlice",
    initialState,
    reducers: {
        removeFromList: (state, action) => {
            state.tasksList = state.tasksList.filter((task) => task.id !== action.payload.id)
        },
         setSelectedTask: (state,action) => {
            state.selectedTask = action.payload;
         }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getTasksfromServer.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(getTasksfromServer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.tasksList = action.payload;
            
        })
        .addCase(getTasksfromServer.rejected, (state, action)=> {
            state.error = action.payload.error;
            state.isLoading = false;
            state.tasksList = []
        })

        .addCase(addTaskToServer.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(addTaskToServer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            
            state.tasksList.push(action.payload)
            
        })
        .addCase(addTaskToServer.rejected, (state, action)=> {
            state.error = action.payload.error;
            state.isLoading = false;
        })

        .addCase(updateTaskInServer.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(updateTaskInServer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
        })
        .addCase(updateTaskInServer.rejected, (state, action)=> {
            state.error = action.payload.error;
            state.isLoading = false;
        })


        .addCase(delTaskFromServer.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(delTaskFromServer.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            
        })
        .addCase(delTaskFromServer.rejected, (state, action)=> {
            state.error = action.payload.error;
            state.isLoading = false;
        })
    }

});

export const { addTasktoList, removeFromList, updateTaskInList, setSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;