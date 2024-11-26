"use client";

import { useApiClient } from "@/components/AuthRequired";
import { VideoRequest } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Grid,
  Input,
  FormLabel,
  FormControl,
  Button,
  FormHelperText,
  Alert,
} from "@mui/joy";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ControlledFileDrop from "./ControlledFileDrop";
import { Error as ErrorIcon } from "@mui/icons-material";

const uploadSchema = z.union([
  z.object({
    title: z.string().optional(),
    file: z.instanceof(File),
  }),
  z.object({
    url: z.string().url(),
    title: z.string().optional(),
  }),
]);

export default function UploadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm<VideoRequest & { file?: File }>({
    resolver: zodResolver(uploadSchema),
  });

  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const createVideo = useMutation({
    mutationFn: apiClient?.createVideo.bind(apiClient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video"] });
      onClose();
      reset();
    },
    onError: console.error,
  });
  const uploadVideo = useMutation({
    mutationFn: apiClient?.uploadVideo.bind(apiClient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video"] });
      onClose();
      reset();
    },
    onError: console.error,
  });

  function onSubmit({ url, title, file }: VideoRequest & { file?: File }) {
    if (url) {
      createVideo.mutate({ url, title: title || url.split("/").pop()! });
    } else if (file) {
      uploadVideo.mutate({ title: title || file.name, file });
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: "1000px" }}>
        <ModalClose />
        <Typography level="title-lg">Upload Video</Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid xs={6}>
              <ControlledFileDrop control={control} name="file" />
            </Grid>
            <Grid xs={6}>
              <FormControl error={!!errors.url}>
                <FormLabel>Or enter a URL</FormLabel>
                <Input type="url" placeholder="https://" {...register("url")} />
                {errors.url && (
                  <FormHelperText>{errors.url.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <FormControl error={!!errors.title} sx={{ mb: 2 }}>
            <FormLabel>Title</FormLabel>
            <Input {...register("title")} />
            {errors.title && (
              <FormHelperText>{errors.title.message}</FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            disabled={
              createVideo.isPending || uploadVideo.isPending || !isValid
            }
            sx={{ width: "100%" }}
          >
            {createVideo.isPending || uploadVideo.isPending
              ? "Loading"
              : "Upload"}
          </Button>
          {(createVideo.isError || uploadVideo.isError) && (
            <Alert
              color="danger"
              startDecorator={<ErrorIcon />}
              sx={{
                mt: 2,
                width: "100%",
              }}
            >
              <Typography>
                An error occured. Please verify your network connection and try
                again.
              </Typography>
            </Alert>
          )}
        </form>
      </ModalDialog>
    </Modal>
  );
}
