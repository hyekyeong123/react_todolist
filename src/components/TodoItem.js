import React from 'react';
import styled, {css} from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md'
import { useTodoDispatch } from '../TodoContext';


//휴지통 모양 아이콘
const Remove = styled.div`
    opacity:0;
    display:flex;
    align-content:center;
    align-items:center;
    color:#dee2e6;
    font-size:24px;
    cursor:pointer;
    &:hover{
        color:#ff6b6b;
    }
`;
const CheckCircle = styled.div`
    width:32px;
    height:32px;
    border-radius:50%;
    border:1px solid #ced4da;
    font-size:24px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:20px;
    cursor:pointer;
    /* 여기서도 props를 쓸 수 있는거였어...? */
    ${props => props.done && css`
    /* 만약에 done값이 있다면 변경하기 */
        border:1px solid #38d8a9;
        color:#38d9a9;   
    `}
`;
const Text = styled.div`
    flex:1;
    font-size:21px;
    color:#495057;
    ${props => props.done && css`
        color:#ce34da;
    `}
`;
const TodoItemBlock = styled.div`
    display:flex;
    align-items:center; 
    /* 세로 가운데 정렬 */
    padding-top:12px;
    padding-bottom:12px;

    &:hover {
        ${Remove}{
            opacity:1;
        }
    }
`;


const TodoItem = ({ id, done, text }) => {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({
        type: 'TOGGLE',
        id
    });
    const onRemove = () => dispatch({
        type: 'REMOVE',
        id
    });
    // ---------------------------------------------
    return (
        <div>
            <TodoItemBlock>
                <CheckCircle done={done} onClick={onToggle}>
                    {done && <MdDone />}
                    {/* 만약에 done이 true라면  */}
                </CheckCircle>
                <Text done={done}>{text}</Text >
                <Remove onClick={onRemove}>
                    <MdDelete/ >
                </Remove>
            </TodoItemBlock>
        </div>
    );
};

export default React.memo(TodoItem);