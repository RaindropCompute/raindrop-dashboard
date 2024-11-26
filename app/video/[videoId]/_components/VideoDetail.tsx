"use client";

import { useApiClient } from "@/components/AuthRequired";
import FetchError from "@/components/FetchError";
import { formatDuration } from "@/lib/utils";
import { Table, Skeleton } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";

export default function VideoDetail({ videoId }: { videoId: string }) {
  const apiClient = useApiClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => apiClient!.getVideo(videoId),
    enabled: !!apiClient,
    refetchInterval: 1000,
  });

  if (isError) {
    return <FetchError error={error} />;
  }
  if (isPending) {
    return (
      <Table>
        <tbody>
          <tr>
            <th scope="row">Title</th>
            <td>
              <Skeleton variant="text" />
            </td>
          </tr>
          <tr>
            <th scope="row">Upload Time</th>
            <td>
              <Skeleton variant="text" />
            </td>
          </tr>
          <tr>
            <th scope="row">Uploaded By</th>
            <td>
              <Skeleton variant="text" />
            </td>
          </tr>
          <tr>
            <th scope="row">Duration</th>
            <td>
              <Skeleton variant="text" />
            </td>
          </tr>
          <tr>
            <th scope="row">Bitrate</th>
            <td>
              <Skeleton variant="text" />
            </td>
          </tr>
          <tr>
            <th scope="row">Resolution</th>
            <td>
              <Skeleton variant="text" />
            </td>
          </tr>
          <tr>
            <th scope="row">Framerate</th>
            <td>
              <Skeleton variant="text" />
            </td>
          </tr>
          <tr>
            <th scope="row">Sample Rate</th>
            <td>
              <Skeleton variant="text" />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Title</th>
          <td>{data.title}</td>
        </tr>
        <tr>
          <th scope="row">Upload Time</th>
          <td>{new Date(data.uploadTime).toLocaleString()}</td>
        </tr>
        <tr>
          <th scope="row">Uploaded By</th>
          <td>{data.uploadedBy.email ?? data.uploadedBy.id}</td>
        </tr>
        <tr>
          <th scope="row">Duration</th>
          <td>
            {data.metadata ? `${formatDuration(data.metadata.duration)}` : "-"}
          </td>
        </tr>
        <tr>
          <th scope="row">Bitrate</th>
          <td>{data.metadata ? `${data.metadata.bitrate / 1000}kbps` : "-"}</td>
        </tr>
        <tr>
          <th scope="row">Resolution</th>
          <td>
            {data.metadata
              ? `${data.metadata.width}x${data.metadata.height}`
              : "-"}
          </td>
        </tr>
        <tr>
          <th scope="row">Framerate</th>
          <td>{data.metadata ? `${data.metadata.framerate}fps` : "-"}</td>
        </tr>
        <tr>
          <th scope="row">Sample Rate</th>
          <td>
            {data.metadata ? `${data.metadata.audioSampleRate / 1000}khz` : "-"}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
