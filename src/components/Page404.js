import { Box, Typography } from "@mui/material";

export default function Page404() {
  return (
    <Box style={{ textAlign: "center" }}>
      <Typography variant="h5" style={{ marginTop: "15%" }}>
        ご指定のページは見つかりませんでした
      </Typography>
      <img src="./img/kane404.jpeg" alt="logo" style={{ marginTop: "25px" }} />
    </Box>
  );
}
