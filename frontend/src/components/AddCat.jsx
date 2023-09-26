// import React, { useState } from 'react';
// import {
//   Container,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Typography,
//   Box,
// } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { parseISO } from 'date-fns';
// import { PhotoCamera } from '@mui/icons-material';
// import axios from 'axios';

// const AddCat = () => {
//   const [catInfo, setCatInfo] = useState({
//     name: '',
//     breed: '',
//     colour: '',
//     dob: null,
//     gender: '',
//     chronic_issues: '',
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCatInfo({
//       ...catInfo,
//       [name]: value,
//     });
//   };

//   const handleDateChange = (newDate) => {
//     setCatInfo({
//       ...catInfo,
//       dob: parseISO(newDate),
//     });
//   };

//   const handleImageChange = (e) => {
//     setCatInfo({
//       ...catInfo,
//       image: e.target.files[0],
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
  

//     // Submit to the server
//     axios
//       .post('http://localhost:3000/cat/addCat', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer YOUR_JWT_TOKEN`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error('There was an error!', error);
//       });
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Typography component="h1" variant="h5">
//         Add Cat
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit}>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Cat Name"
//           name="name"
//           autoFocus
//           onChange={handleChange}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Breed"
//           name="breed"
//           onChange={handleChange}
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Color"
//           name="color"
//           onChange={handleChange}
//         />
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <DatePicker
//             label="Date of Birth"
//             value={catInfo.dob}
//             onChange={handleDateChange}
//             renderInput={(params) => (
//               <TextField {...params} fullWidth variant="outlined" />
//             )}
//           />
//         </LocalizationProvider>
//         <FormControl fullWidth variant="outlined" margin="normal">
//           <InputLabel>Gender</InputLabel>
//           <Select
//             label="Gender"
//             name="gender"
//             value={catInfo.gender}
//             onChange={handleChange}
//           >
//             <MenuItem value="Male">Male</MenuItem>
//             <MenuItem value="Female">Female</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           label="Chronic Issues (if applicable)"
//           name="chronicIssues"
//           onChange={handleChange}
//         />
//         <Button variant="contained" component="label">
//           Upload Image
//           <input
//             type="file"
//             hidden
//             onChange={handleImageChange}
//           />
//           <PhotoCamera />
//         </Button>
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           margin="normal"
//         >
//           Add Cat
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default AddCat;
