import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'; 
import LightModeIcon from '@mui/icons-material/LightMode';
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../../context/DarkModeContext";
import { useTheme } from '@emotion/react';

function DarkModeToggle({ fill}) {
  
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const theme = useTheme()

  return (
    <>
      <ButtonIcon onClick={toggleDarkMode}>
        {isDarkMode ? <LightModeIcon sx={{ fill: '#fff' }} /> : <DarkModeOutlinedIcon sx={{ fill: fill || theme.palette.primary.main }} />}
    </ButtonIcon>
    </>
  );
}

export default DarkModeToggle;
