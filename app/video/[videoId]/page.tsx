import { Box, Breadcrumbs, Grid, Link, Stack, Typography } from "@mui/joy";
import VideoPlayer from "@/components/VideoPlayer";
import NextLink from "next/link";
import VideoDetail from "./_components/VideoDetail";
import DeleteButton from "./_components/DeleteButton";

export default async function Page({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;

  return (
    <>
      <Breadcrumbs sx={{ mb: 2 }}>
        <NextLink passHref href="/" legacyBehavior>
          <Link>Videos</Link>
        </NextLink>
        <Typography>{videoId}</Typography>
      </Breadcrumbs>

      <Grid container sx={{ mb: 2 }} spacing={2}>
        <Grid xs={7}>
          <VideoPlayer
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/video/${videoId}/manifest.mpd`}
          />
        </Grid>
        <Grid xs={5}>
          <Stack sx={{ height: "100%" }}>
            <Typography level="title-lg" mb={2}>
              Example
            </Typography>
            <Box sx={{ flex: "1" }}>
              <Box sx={{ overflow: "auto", height: 0, minHeight: "100%" }}>
                <pre>
                  {`<!doctype html>
<html>
<body>
<div>
    <video data-dashjs-player src="${process.env.NEXT_PUBLIC_API_BASE_URL}/video/${videoId}/manifest.mpd" controls>
    </video>
</div>
<script src="https://cdn.dashjs.org/v3.1.0/dash.all.min.js"></script>
</body>
</html>`}
                </pre>
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <Typography level="title-lg" mb={2}>
          Video Details
        </Typography>
        <VideoDetail videoId={videoId} />
      </Box>

      <DeleteButton videoId={videoId} />
    </>
  );
}
