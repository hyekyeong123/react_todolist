// 컨텍스트 만들기

import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [  
    {
        id: 1,
        text: '프로젝트 생성하기',
        done:true
        // done는 할일을 마쳤는가 아직 하지않았는가 
    },
    {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done:true
    },
    {
        id: 3,
        text: 'Context 만들기',
        done:true
    },
    {
        id: 4,
        text: '기능 구현하기',
        done:false
    },
];
const todoReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        // action안에 todo항목을 넣을 것인ㅁ
        case 'TOGGLE':
            return state.map(
                todo => todo.id === action.id ? { ...todo, done: !todo.done } : todo
                //todo의 id가 action의 id와 동일하다면 기존의 todo 업데이트 하고 done의 상태 반전
                // 다르다면 유지
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
                // 일치하지 않는것만 그대로 가져오기
                // 일치한다면 안가져오니까 삭제
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
// 컨텍스트 만들기 ------------------------------------------------------------
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

// ------------------------------------------------------------
export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    // 만든 리듀서,초기상태

    const nextId = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    )
}
// 훅 만들기 + 에러처리
// -----------------------------------------------------
export function useTodoState() {
    // return useContext(TodoStateContext);
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
// --------------------------------