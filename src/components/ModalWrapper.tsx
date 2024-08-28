import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalWrapper;
