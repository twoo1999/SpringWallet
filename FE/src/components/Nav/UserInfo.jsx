import styled from "styled-components";

const Wrapper = styled.div`
    padding: 32px 0px;
    border-top: 1px solid gray;
`;

const TextWrapper = styled.div`
 
    display: flex;
    flex-direction: column;
    color: white;
`;

export function UserInfo(){
    return(
        <Wrapper>
            <TextWrapper>
                <span>nickname</span>
                <span>view profile</span>
            </TextWrapper>

        </Wrapper>
    )
}