import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
    background: #38d9a9;
    /* 초록색 */

    &:hover {
        /* 밝아지고 */
        background: #63e6be;
    }
    &:active {
        /* 어두워지고 */
        background: #20c997;
    }
    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    left: 50%;
    bottom: -75px;
    transform: translate(-50%, -50%);

    font-size: 60px;
    color: white;
    border-radius: 40px;

    border: none;
    outline: none;

    transition: 0.2s all ease-in;
    /* {open}이 true일 때---------------------- */
    ${props =>
        props.open &&
        css`
            background: #ff6b6b;
            &:hover {
                background: #ff8787;
            }
            &:active {
                background: #f65252;
            }
            transform: translate(-50%, -50%) rotate(45deg);
        `}
`;
//---------------------------------------------
const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;
const InsertForm = styled.form`
    background: #f8f9fa;
    padding: 32px;
    padding-bottom: 72px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`;
//---------------------------------------------
const TodoCreate = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    // -----------------------------------------------
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();
    // ------------------------------------------------
    
    const onToggle = () => setOpen(!open);
    //기존의 값을 반전
    
    const onChange = (e) => setValue(e.target.value);
    
    const onSubmit = e => {
        e.preventDefault();
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done:false
            }
        })
        setValue(''); // 초기화
        setOpen(false); //아직 하지 않은 목록들
        nextId.current += 1;
    }
    // -----------------------------------------------
    return (
        <>
            {open && (
                // 추가 버튼 클릭 시
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input
                            placeholder='할 일을 입력 후 Enter 를 누르세요'
                            autoFocus
                            onChange={onChange}
                            value = {value}
                        />
                        {/* //자동으로 포커스 */}
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    );
};

export default React.memo(TodoCreate);
