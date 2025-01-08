import styled from "styled-components";


const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0;
  transition: all 0.2s;
 text-align: left;
  &:hover {
    cursor: pointer;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    @media (max-width: 768px) {
    width: 1.5rem;
    height: 1.5rem;
  }
    /* color: var(--color-brand-600); */
  }
`;

export default ButtonIcon;
