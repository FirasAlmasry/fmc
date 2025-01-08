// pages/NotFound.js
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Heading from "./../components/global/Heading";
import { CssBaseline } from "@mui/material";
import { useTheme } from '@emotion/react';

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 4.8rem; */
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;
const NotFound = () => {
    const theme = useTheme()

    return (
        <>
            <CssBaseline />
            <StyledErrorFallback>
                <Box>
                    <Heading as="h1">404 - الصفحة غير موجودة 🧐</Heading>
                    <p>{'عذراً، الصفحة التي تحاول الوصول إليها غير موجودة.'}</p>
                    <Link to="/" style={{ display: 'inline-block', color: theme.palette.primary.text, textDecoration: 'none', padding: '8px 16px', background: theme.palette.primary.main, borderRadius:'8px' }}>
                        العودة إلى الصفحة الرئيسية
                    </Link>
                </Box>
            </StyledErrorFallback>
        </>
    );
};

export default NotFound;
