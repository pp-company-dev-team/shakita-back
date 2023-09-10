import styled from "styled-components";

export const AuthStyled = styled.div`
  min-height: calc(90vh - 15vh);
  //   min-height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .auth-back-logo {
    width: auto;
    height: 55%;
    position: fixed;
    z-index: -1;
    opacity: 0.1;
  }
  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1.5em;
  }

  a {
    color: white;
  }
`;
