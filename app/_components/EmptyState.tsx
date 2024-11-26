"use client";

import { Info } from "@mui/icons-material";
import { Alert, Box, Typography } from "@mui/joy";

export default function EmptyState() {
  return (
    <Alert
      color="neutral"
      startDecorator={<Info />}
      sx={{ mx: "auto", alignItems: "flex-start", gap: "1rem", my: 4 }}
      variant="outlined"
    >
      <Box>
        <Typography level="title-lg" mb={1}>
          No videos uploaded
        </Typography>
        <Typography>Hit the upload button above to get started!</Typography>
      </Box>
    </Alert>
  );
}
