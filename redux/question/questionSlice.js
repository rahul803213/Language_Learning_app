import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions:[],
    marks:0,
    perfomance:0,
    showNextButton:false,
    currentQuestionIndex: 0, 
    userResponse:[],
    fullmarks:0
}

export const questions = createSlice({
    name:"questions",
    initialState,
    reducers:{
        setQuestions : (state,action) =>{
            state.questions=action.payload
           
        },
        setMarks:(state,action) =>{
        state.marks=action.payload
        },
        setFullMarks:(state,action) =>{
            state.fullmarks=action.payload
            },
        resetMarks:(state) =>{
            state.marks=0
            },
        removeQuestions: (state) => {
            state.questions = []
           
        },
        nextQuestion: (state, action) => {
            state.currentQuestionIndex += 1;
            // The action payload should contain the next question to set
            state.questions = state.questions.slice(); // Create a shallow copy
            state.questions[state.currentQuestionIndex] = action.payload; // Update the current question with the next question
          },
          setCurrentQuestionIndexToZero: (state) => {
            state.currentQuestionIndex = 0;
          },
       toggleShowNextButton:(state) => {
        state.showNextButton=!state.showNextButton
       }
       
    }
});

export const {setQuestions, removeQuestions,setFullMarks,setMarks,nextQuestion,setCurrentQuestionIndexToZero,resetMarks,toggleShowNextButton} = questions.actions;
export default questions.reducer;