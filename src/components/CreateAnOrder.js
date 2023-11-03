import { Box, Modal } from "@mui/material";

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

export default function CreateAnOrder({ open, close }) {
     return (
          <Modal
               open={open}
               onClose={close}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
          >
               <Box sx={style}>
               </Box>
          </Modal>
     )
}