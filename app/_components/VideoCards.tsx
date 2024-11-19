"use client";

import Grid from "@mui/joy/Grid";
import VideoCard from "./VideoCard";
import React from "react";
import { useApiClient } from "@/components/AuthRequired";
import { Video } from "@/lib/api";
import VideoCardSkeleton from "./VideoCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import FetchError from "@/components/FetchError";

export default function VideoCards({ sort }: { sort: keyof Video }) {
  const apiClient = useApiClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["video"],
    queryFn: apiClient?.getVideos.bind(apiClient),
    enabled: !!apiClient,
  });

  if (isError) {
    return <FetchError error={error!} />;
  }
  if (isPending) {
    return Array.from({ length: 3 }, (_, index) => (
      <Grid key={index} xs={4}>
        <VideoCardSkeleton />
      </Grid>
    ));
  }

  return data!
    .sort((a, b) => (a[sort]! > b[sort]! ? 1 : a[sort]! < b[sort]! ? -1 : 0))
    .map((item, index) => (
      <Grid key={index} xs={4}>
        <VideoCard video={item} />
      </Grid>
    ));
}
