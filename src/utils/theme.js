// theme.js
import { createTheme } from '@mui/material/styles';

const baseTheme = {
    typography: {
        fontWeight: '600',
        h1: {
            fontWeight: 'bold'
        },
        h2: {
            fontWeight: '600'
        },
        h3: {
            fontWeight: '500'
        },
        h4: {
            fontWeight: '400'
        },
        h5: {
            fontWeight: '400'
        },
        h6: {
            fontWeight: '400'
        },
    },
};

const lightPalette = {
    mode: 'light',
    primary: {
        main: "#3C1FAB",
        text: "#fff",
        default: "#202020"
    },
    secondary: {
        main: "#00B8D7",
        text: "#3C1FAB",
        default: "#727272"
    },
    nav: {
        main: "#FFFFFF",
        link: '#727272',
        hover: '#3C1FAB',
        btn:'#3C1FAB'
    },
    footer: {
        main: "#102251",
        link: '#fff',
        hover: '#A69F9F'
    },
    background: {
        default: "#F8F8FA",
        section: "#f7f7f7",
        card: '#F8F8FA',
        date: '#fff',
        tap: '#E5E7EB',
        input: "#fff",
        form: "#fff",
        file: "#f0f0f0",
        drawer: ''
    },
    boxShadow: "0px 2px 5px 0px #0000001A"
};

const darkPalette = {
    mode: 'dark',
    primary: {
        main: "#000",
        text: "#fff",
        default: "#fff"
    },
    secondary: {
        main: "#2e2e2e",
        text: "#fff",
    },
    nav: {
        main: "#000",
        link: '#fff',
        hover: '#A69F9F',
        btn:'#3C1FAB'
    },
    footer: {
        main: "#121212",
        link: '#fff',
        hover: '#A69F9F'
    },
    background: {
        default: "#121212",
        section: "#1e1e1e",
        card: '#2e2e2e',
        date: '#2e2e2e',
        tap: '#2e2e2e',
        input: "#1e1e1e",
        form: "#121212",
        file: "#2e2e2e",
    },
    boxShadow: "0px 2px 5px 0px #0000001A"
};

const getPalette = (mode) => (mode === 'dark' ? darkPalette : lightPalette);
// const getPalette = (mode) => (lightPalette);

const theme = (mode) => createTheme({ palette: getPalette(mode), baseTheme });

export default theme;
