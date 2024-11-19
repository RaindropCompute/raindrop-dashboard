"use client";

import { Error as ErrorIcon } from "@mui/icons-material";
import { Alert, Box, Typography } from "@mui/joy";
import { useEffect } from "react";

export default function FetchError({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Alert
      color="danger"
      startDecorator={<ErrorIcon />}
      sx={{ mx: "auto", alignItems: "flex-start", gap: "1rem", my: 4 }}
      variant="outlined"
    >
      <Box>
        <Typography level="title-lg" mb={1}>
          An error occurred
        </Typography>
        <Typography mb={1}>
          Please verify your network connection and try again.
        </Typography>
        <Typography level="body-sm">{error.toString()}</Typography>
      </Box>
    </Alert>
  );
}
