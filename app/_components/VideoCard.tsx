import Image from "next/image";
import {
  Link,
  Stack,
  Typography,
  Card,
  CardContent,
  Box,
  Checkbox,
  Skeleton,
  ColorPaletteProp,
  Chip,
} from "@mui/joy";
import NextLink from "next/link";
import { formatDuration } from "@/lib/utils";

const statusToColor: {
  PENDING: ColorPaletteProp;
  UPLOADED: ColorPaletteProp;
  IN_PROGRESS: ColorPaletteProp;
  ERROR: ColorPaletteProp;
} = {
  PENDING: "primary",
  UPLOADED: "primary",
  IN_PROGRESS: "primary",
  ERROR: "danger",
};
const statusToHuman = {
  PENDING: "Waiting for Upload",
  UPLOADED: "Pending",
  IN_PROGRESS: "Processing",
  ERROR: "Failed",
};

export default function VideoCard({
  video,
  isChecked,
  onCheck,
}: {
  video: {
    id: string;
    status: "PENDING" | "UPLOADED" | "IN_PROGRESS" | "FINISHED" | "ERROR";
    title: string;
    metadata: {
      duration: number;
    } | null;
    uploadTime: string;
  };
  isChecked: boolean;
  onCheck: (checked: boolean) => void;
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ position: "relative" }}>
          <Checkbox
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
            }}
            checked={isChecked}
            onChange={(e) => onCheck?.(e.target.checked)}
          />
        </Box>
        <NextLink href={`/video/${video.id}`}>
          {video.status === "FINISHED" ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/video/${video.id}/thumbnail.webp`}
              alt="Thumbnail"
              width="1920"
              height="1080"
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            <Skeleton variant="rectangular" height={153} />
          )}
        </NextLink>
        <Stack justifyContent="space-between" direction="row" spacing={1}>
          <Typography level="title-lg" component="div">
            <NextLink href={`/video/${video.id}`} passHref legacyBehavior>
              <Link>{video.title}</Link>
            </NextLink>
          </Typography>
          {video.status !== "FINISHED" && (
            <Chip color={statusToColor[video.status]}>
              <Typography level="body-md">
                {statusToHuman[video.status]}
              </Typography>
            </Chip>
          )}
        </Stack>
        <Stack justifyContent="space-between" direction="row" spacing={1}>
          <Typography level="body-md" sx={{ color: "text.secondary" }}>
            {video.metadata ? formatDuration(video.metadata.duration) : ""}
          </Typography>
          <Typography level="body-md" sx={{ color: "text.secondary" }}>
            {new Date(video.uploadTime).toLocaleString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
