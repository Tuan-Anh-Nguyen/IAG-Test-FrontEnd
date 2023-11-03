import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import CreateNewProduct from "./CreateNewProduct";
import CreateAnOrder from "./CreateAnOrder";

export default function ProductsTable() {
     const [productsList, setProductsList] = useState([]);
     const [openAdd, setOpenAdd] = useState(false);
     const [openOrderModal, setOpenOrderModal] = useState(false);

     const getProductsList = async () => {
          const requestOptions = {
               method: 'GET',
               redirect: 'follow'
          }
          try {
               const response = await fetch('http://localhost:8080/products', requestOptions);
               const data = await response.json();
               setProductsList(data.data)
          } catch (err) {
               console.log(err);
          }
     }

     useEffect(() => {
          getProductsList();
     }, [])

     return (
          <>
               <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                         <h3><b>Products Table</b></h3>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'end', marginRight: 23 }}>
                         <Button variant="contained" onClick={() => setOpenAdd(true)} sx={{ marginRight: 2 }}>
                              Add Product
                         </Button>
                         <Button variant="outlined" onClick={() => setOpenOrderModal(true)}>
                              Create A New Order
                         </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                         <Table sx={{ minWidth: 650, maxWidth: 900, border: '1px solid #babfc5', borderRadius: '8px' }}>
                              <TableHead>
                                   <TableRow>
                                        <TableCell sx={{ fontSize: '16px', fontWeight: 600, textAlign: 'center' }}>ID</TableCell>
                                        <TableCell sx={{ fontSize: '16px', fontWeight: 600, textAlign: 'center' }}>Name</TableCell>
                                        <TableCell sx={{ fontSize: '16px', fontWeight: 600, textAlign: 'center' }}>Price</TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {productsList.map((item) => {
                                        return (
                                             <TableRow>
                                                  <TableCell sx={{ textAlign: 'center' }}>{item.id}</TableCell>
                                                  <TableCell sx={{ textAlign: 'center' }}>{item.name}</TableCell>
                                                  <TableCell sx={{ textAlign: 'center' }}>{item.price}</TableCell>
                                             </TableRow>
                                        )
                                   })}
                              </TableBody>
                         </Table>
                    </Grid>
                    <CreateNewProduct openProp={openAdd} closeProp={() => setOpenAdd(false)} productsList={productsList} getProductsList={getProductsList} />
                    <CreateAnOrder open={openOrderModal} close={() => setOpenOrderModal(false)} />
               </Grid>
          </>
     )
}