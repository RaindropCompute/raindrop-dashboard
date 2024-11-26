"use client";

import { Delete } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/components/AuthRequired";
import { useAlert } from "@/components/Alerts";
import { Button } from "@mui/joy";
import { useRouter } from "next/navigation";

export default function DeleteButton({ videoId }: { videoId: string }) {
  const apiClient = useApiClient();
  const { showError } = useAlert();
  const queryClient = useQueryClient();
  const router = useRouter();
  const doDelete = useMutation({
    mutationFn: () => apiClient!.deleteVideo(videoId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["video"] });
      await router.push("/");
    },
    onError: showError,
  });

  return (
    <Button
      color="danger"
      startDecorator={<Delete />}
      onClick={() => doDelete.mutate()}
      disabled={doDelete.isPending}
      sx={{ width: "100%" }}
      variant="soft"
    >
      {doDelete.isPending ? "Loading" : "Delete"}
    </Button>
  );
}
