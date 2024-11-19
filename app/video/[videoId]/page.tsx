import {
  Box,
  Breadcrumbs,
  Grid,
  Link,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import VideoPlayer from "@/components/VideoPlayer";
import NextLink from "next/link";

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

      <Typography level="title-lg" mb={2}>
        Video Details
      </Typography>
      <Table>
        <tbody>
          <tr>
            <th scope="row">Title</th>
            <td>Video Title</td>
          </tr>
          <tr>
            <th scope="row">Length</th>
            <td>1:23:45</td>
          </tr>
          <tr>
            <th scope="row">Published</th>
            <td>2022-01-01</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
