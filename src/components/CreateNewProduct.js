import { Box, Button, FormLabel, Grid, Modal, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 400,
     bgcolor: 'background.paper',
     border: '1px solid #babfc5',
     boxShadow: 24,
     p: 4,
};

export default function CreateNewProduct({ openProp, closeProp, productsList, getProductsList }) {
     const [nameInput, setNameInput] = useState('');
     const [priceInput, setPriceInput] = useState('');

     const handleNameChange = (event) => {
          setNameInput(event.target.value);
     }

     const handlePriceChange = (event) => {
          setPriceInput(event.target.value);
     }

     const handleCreateNewProduct = async () => {
          const body = {
               method: "POST",
               body: JSON.stringify({
                    name: nameInput,
                    price: priceInput
               }),
               headers: {
                    'Content-type': 'application/json; charset=UTF-8'
               }
          }
          await fetch("http://localhost:8080/products", body)
               .then((res) => {
                    if (res.status !== 201) {
                         toast.error('Create product unsuccessfully!')
                    } else {
                         return res.json();
                    }
               })
               .then((data) => {
                    toast.success('Create product successfully!')
                    getProductsList();
                    closeProp();
               })
               .catch((err) => {
                    console.log(err);
               })
     }

     return (
          <>
               <Modal
                    open={openProp}
                    onClose={closeProp}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
               >
                    <Box sx={style}>
                         <Grid container spacing={2}>
                              <Grid item xs={12}>
                                   <h3><b>Add New Product</b></h3>
                              </Grid>
                              <Grid item xs={3}>
                                   <FormLabel>Name</FormLabel>
                              </Grid>
                              <Grid item xs={9}>
                                   <TextField variant="outlined" name="name" onChange={handleNameChange} />
                              </Grid>
                              <Grid item xs={3}>
                                   <FormLabel>Price</FormLabel>
                              </Grid>
                              <Grid item xs={9}>
                                   <TextField variant="outlined" name="price" onChange={handlePriceChange} />
                              </Grid>
                              <Grid item xs={12} sx={{ textAlign: 'end' }}>
                                   <Button variant="contained" onClick={handleCreateNewProduct}>
                                        Confirm
                                   </Button>
                              </Grid>
                         </Grid>
                    </Box>
               </Modal>
          </>
     )
}