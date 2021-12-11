import {  Box , Typography} from '@material-ui/core';
const Tags = ({ data }) => {
  return (
    <Box
      sx={{
        background: "#4682B4",
        height: "100%",
        display: "flex",
        padding: "0.4rem",
        margin: "0 0.5rem 0.4rem 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
      }}
    >
      <Typography>{data}</Typography>
    </Box>
  );
};
export default Tags