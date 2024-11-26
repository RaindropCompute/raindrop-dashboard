"use client";

import Grid from "@mui/joy/Grid";
import Box from "@mui/joy/Box";
import { useState } from "react";
import VideoCards from "./VideoCards";
import { Select, Option, Stack, Button } from "@mui/joy";
import UploadModal from "./UploadModal";
import { Delete, Sort, Upload } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/components/AuthRequired";
import { useAlert } from "@/components/Alerts";

const sortOptions = {
  uploadTime: "Date",
  duration: "Length",
};

export default function VideoGrid() {
  const [sortBy, setSortBy] = useState<keyof typeof sortOptions>("uploadTime");
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(new Set<string>());
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const { showError } = useAlert();
  const doDelete = useMutation({
    mutationFn: () =>
      Promise.all(Array.from(checked, (id) => apiClient!.deleteVideo(id))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video"] });
    },
    onError: showError,
  });

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" sx={{ mb: 2 }} spacing={1}>
          <Select
            value={sortBy}
            startDecorator={<Sort />}
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

          <Button
            color="danger"
            startDecorator={<Delete />}
            onClick={() => doDelete.mutate()}
            disabled={checked.size === 0 || doDelete.isPending}
          >
            {doDelete.isPending ? "Loading" : "Delete"}
          </Button>
          <Button startDecorator={<Upload />} onClick={() => setOpen(true)}>
            Upload
          </Button>
        </Stack>
        <Grid container spacing={2}>
          <VideoCards sort={sortBy} checked={checked} setChecked={setChecked} />
        </Grid>
      </Box>

      <UploadModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
