"use client";

import Grid from "@mui/joy/Grid";
import VideoCard from "./VideoCard";
import React, { SetStateAction, useEffect } from "react";
import { useApiClient } from "@/components/AuthRequired";
import VideoCardSkeleton from "./VideoCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import FetchError from "@/components/FetchError";
import EmptyState from "./EmptyState";

export default function VideoCards({
  sort,
  checked,
  setChecked,
}: {
  sort: "uploadTime" | "duration";
  checked: Set<string>;
  setChecked: (checked: SetStateAction<Set<string>>) => void;
}) {
  const apiClient = useApiClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["video"],
    queryFn: () => apiClient!.getVideos(),
    enabled: !!apiClient,
    refetchInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      setChecked(
        (checked) =>
          new Set(data.map((v) => v.id).filter((id) => checked.has(id)))
      );
    }
  }, [data, setChecked]);

  if (isError) {
    return <FetchError error={error} />;
  }
  if (isPending) {
    return Array.from({ length: 3 }, (_, index) => (
      <Grid key={index} xs={4}>
        <VideoCardSkeleton />
      </Grid>
    ));
  }
  if (data.length === 0) {
    return <EmptyState />;
  }

  function handleCheck(isChecked: boolean, id: string) {
    if (isChecked) {
      setChecked((checked) => new Set(checked).add(id));
    } else {
      setChecked((checked) => {
        const newChecked = new Set(checked);
        newChecked.delete(id);
        return newChecked;
      });
    }
  }

  if (sort === "uploadTime") {
    return data
      .sort((a, b) =>
        a.uploadTime > b.uploadTime ? 1 : a.uploadTime < b.uploadTime ? -1 : 0
      )
      .map((item, index) => (
        <Grid key={index} xs={4}>
          <VideoCard
            video={item}
            isChecked={checked.has(item.id)}
            onCheck={(isChecked) => handleCheck(isChecked, item.id)}
          />
        </Grid>
      ));
  } else {
    return data
      .sort((a, b) =>
        a.metadata?.duration ?? 0 > (b.metadata?.duration ?? 0)
          ? 1
          : a.metadata?.duration ?? 0 < (b.metadata?.duration ?? 0)
          ? -1
          : 0
      )
      .map((item, index) => (
        <Grid key={index} xs={4}>
          <VideoCard
            video={item}
            isChecked={checked.has(item.id)}
            onCheck={(isChecked) => handleCheck(isChecked, item.id)}
          />
        </Grid>
      ));
  }
}
