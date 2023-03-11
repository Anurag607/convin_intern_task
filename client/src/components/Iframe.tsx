import React from "react";
import NoSsr from "@mui/base/NoSsr";
import { Box, Modal, Fade, Backdrop } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeIFrame } from "../redux/iframe";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
};

const IFrame = () => {
  const { isIFrameOpen, url } = useSelector((state: any) => state.openiframe);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeIFrame());
  };

  return (
    <div>
      <NoSsr>
        <Modal
          open={isIFrameOpen}
          onClose={handleClose}
          closeAfterTransition
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={isIFrameOpen}>
            <Box sx={style}>
              <iframe
                width={0.75 * 1280}
                height={0.65 * 616}
                src={url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                frameBorder={0}
                allowFullScreen
              ></iframe>
            </Box>
          </Fade>
        </Modal>
      </NoSsr>
    </div>
  );
};

export default IFrame;
