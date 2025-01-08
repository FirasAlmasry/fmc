// ReusableTabAuth.js
import { useTheme } from '@emotion/react';
import { Box, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // أيقونة "صح" 

const ReusableTabAuth = ({ width = '100%',selectedOption, setSelectedOption, options }) => {
    const theme = useTheme();

    return (
        <Box sx={{  }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, justifyContent:'space-evenly' }}>
                {options.map((option, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: 1,
                            borderRadius: 1,
                            backgroundColor: theme.palette.background.tap,
                            width: { md: '25%', xs: width },
                            height: { md: '125px', xs: 'auto' },
                            position: 'relative', 
                            justifyContent:'center',
                            textAlign:'center',
                            // border: selectedOption === option.value ? `2px solid ${theme.palette.primary.main}` : 'none',
                        }}
                        onClick={() => setSelectedOption(option.value)}
                    >
                        {/* عرض إشارة "صح" فقط عندما يكون الخيار نشطاً */}
                        {selectedOption === option.value && (
                            <CheckCircleIcon
                                sx={{
                                    color: theme.palette.primary.main,
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                    fontSize: '1rem',
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: '50%',
                                }}
                            />
                        )}
                        <IconButton sx={{ p: 0 }} color={selectedOption === option.value ? 'primary' : 'default'}>
                            {option.icon}
                        </IconButton>
                        <Typography color={selectedOption === option.value ? 'primary' : 'textSecondary'}>
                            {option.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ReusableTabAuth;
