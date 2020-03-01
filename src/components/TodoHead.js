import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';

// 현재 날짜, 요일이 적혀 있는 헤드 덩어리
const TodoHeadBlock = styled.div`
    padding-top: 48px;
    padding-left:32px;
    padding-right:32px;
    padding-bottom:24px;
    border-bottom:1px solid #e9ecef;
    h1{
        margin:0;
        font-size:36px;
        color: #343a40;
    }
    .day{
        margin-top:4px;
        color:#868e96;
        font-size:21px;
    }
    .task-left{
        color:#20c007;
        font-size:18px;
        margin-top:40px;
        font-weight:bold;
    }
`;

const TodoHead = () => {
    const todos = useTodoState(); //훅 가져오기
    const undoneTasks = todos.filter(todo => !todo.done)
    // done 값이 false인것들(아직 하지 않은 할일 목록들)

    // 오늘 날짜 구현하기------------------------------
    const today = new Date();
    const dateString = today.toLocaleDateString('Ko-KR', {
        year: 'numeric',
        month: 'long',
        day:'numeric'
    })
    const dayName = today.toLocaleDateString('ko-KR', {
        weekday:'long'
    })
// ----------------------------------------------------
    return (
        <div>
            <TodoHeadBlock>
                <h1>{dateString}</h1>
                <div className='day'>{dayName}</div>
                <div className='task-left'>할 일 {undoneTasks.length}개 남음</div> 
            </TodoHeadBlock >
        </div>
    );
};

export default TodoHead;