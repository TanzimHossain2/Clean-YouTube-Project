import { Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container sx={{ marginTop: 16 }}>
      <Typography variant="h1" align="center">
        404
      </Typography>
      <Typography variant="h3" align="center">
        Page Not Found
      </Typography>
    </Container>
  );
};
export default NotFound;
