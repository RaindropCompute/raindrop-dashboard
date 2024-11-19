"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { Stack, Box, Typography, Button } from "@mui/joy";

export default function Navbar() {
  const { logout } = useAuth0();

  return (
    <Stack
      sx={{ bgcolor: "background.level1", px: 2, py: 1 }}
      spacing={2}
      direction="row"
      alignItems="center"
    >
      <Box>
        <Typography level="title-lg">Raindrop</Typography>
      </Box>
      <Box flex="1" />
      <Button onClick={() => logout()}>Log Out</Button>
    </Stack>
  );
}
