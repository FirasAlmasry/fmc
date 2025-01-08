import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import defaultImage from './../../assets/auth/defaultImage.png'
import { InputLabel, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload({ labelImage, labelBioImage, width = 120, borderRadius = '50%', onChange, value, name='logo'  }) {
    // console.log("🚀 ~ InputFileUpload ~ value:", value)
    // const [imageUrl, setImageUrl] = React.useState();
    // const theme = useTheme();

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => setImageUrl(reader.result);
    //         reader.readAsDataURL(file);

    //         // استدعاء الدالة التي تُمرر الملف
    //         if (onChange) {
    //             onChange(event);
    //         }
    //     }
    // };
    const theme = useTheme();

    // إذا كانت القيمة موجودة نستخدمها كـ `imageUrl`، وإلا الصورة الافتراضية
    const [imageUrl, setImageUrl] = React.useState(value || defaultImage);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageUrl(reader.result);
            reader.readAsDataURL(file);

            // استدعاء الدالة التي تُمرر الملف
            if (onChange) {
                onChange(event);
            }
        }
    };

    React.useEffect(() => {
        // تحديث الصورة إذا تغيرت القيمة الخارجية
        if (value) {
            setImageUrl(value);
        }
    }, [value]);
    return (
        <>
            <Box
                component="label"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    width: width,
                    height: width === 120 ? 120 : 145,
                    borderRadius: borderRadius,
                    overflow: 'hidden',
                    backgroundColor: theme => theme.palette.background.file,
                    position: 'relative',
                }}
            >
                <img
                    src={imageUrl || defaultImage} // ضع رابط الصورة الافتراضية هنا
                    alt="الشعار"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'scale-down',
                    }}
                />
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    name={name}
                    onChange={handleFileChange}
                />
            </Box>

            {!imageUrl && <>
                <Box>
                    <InputLabel htmlFor={'file'} sx={{ mt: 1, fontWeight: 'bold', color: theme.palette.primary.default }}>
                        {labelImage}
                    </InputLabel>
                    <Typography sx={{ fontWeight: 'bold', color: '#888' }} variant='caption' > {labelBioImage}</Typography>
                </Box>
            </>}
        </>
    );
}

