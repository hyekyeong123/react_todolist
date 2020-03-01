import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    /* //나머지 모든 영역 차지하기 */
    overflow-y: auto;
    background: gray;
`;

const TodoList = () => {
    const todos = useTodoState(); //훅 가져오기
    return (
        <div>
            <TodoListBlock>
                {todos.map(todo => <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    done={todo.done}
                />)}
            </TodoListBlock>
        </div>
    );
};

export default TodoList;
