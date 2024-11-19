"use client";

import Grid from "@mui/joy/Grid";
import Box from "@mui/joy/Box";
import { useState } from "react";
import VideoCards from "./VideoCards";
import { Select, Option, Stack, Button } from "@mui/joy";
import UploadModal from "./UploadModal";

const sortOptions = {
  createdAt: "Date",
  length: "Length",
};

export default function VideoGrid() {
  const [sortBy, setSortBy] = useState<keyof typeof sortOptions>("createdAt");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box sx={{ padding: "0.5em" }}>
        <Stack direction="row" sx={{ mb: "0.5em" }}>
          <Select
            value={sortBy}
            onChange={(_, value) =>
              setSortBy(value as keyof typeof sortOptions)
            }
            sx={{ width: "150px" }}
          >
            {Object.entries(sortOptions).map(([key, opt]) => (
              <Option key={key} value={key}>
                {opt}
              </Option>
            ))}
          </Select>

          <Box sx={{ flex: 1 }} />

          <Button onClick={() => setOpen(true)}>Upload</Button>
        </Stack>
        <Grid container spacing={2}>
          <VideoCards sort={sortBy} />
        </Grid>
      </Box>

      <UploadModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
