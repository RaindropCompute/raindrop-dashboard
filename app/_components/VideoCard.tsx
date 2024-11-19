import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import { Video } from "@/lib/api";
import { Link, Stack } from "@mui/joy";
import NextLink from "next/link";

export default function VideoCard({ video }: { video: Video }) {
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
          />
        </Box>
        <NextLink href={`/video/${video.id}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/video/${video.id}thumbnail.webp`}
            alt="Thumbnail"
            width="1920"
            height="1080"
            style={{ width: "100%", height: "auto" }}
          />
        </NextLink>
        <Typography level="title-lg" component="div">
          <NextLink href={`/video/${video.id}`} passHref legacyBehavior>
            <Link>{video.title}</Link>
          </NextLink>
        </Typography>
        <Stack justifyContent="space-between" direction="row" spacing={1}>
          <Typography level="body-md" sx={{ color: "text.secondary" }}>
            {video.length}
          </Typography>
          <Typography level="body-md" sx={{ color: "text.secondary" }}>
            {video.createdAt}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
