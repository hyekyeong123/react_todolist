import React from 'react';
import styled from 'styled-components';

// 회색 브라우저 안에 있는 흰색 박스 만들기
const TodoTemplateBlock = styled.div` 
    width:512px;
    height: 769px;
    
    position:relative;
    background:white;
    border-radius:16px;
    box-shadow:0 0 8px rgba(0,0,0,0.04);

    margin: 0 auto;
    margin-top:96px;
    margin-bottom:32px;

    display:flex;
    flex-direction:column;

`;


const TodoTemplate = ({children}) => {
    return (
        <div>
            <TodoTemplateBlock>{children}</TodoTemplateBlock>
            {/* TodoTemplate을 TodoTemplateBlock스타일 안에다 넣기(children 사용) */}
        </div>
    );  
};

export default TodoTemplate;