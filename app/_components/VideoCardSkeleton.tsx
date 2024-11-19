import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Skeleton } from "@mui/joy";

export default function VideoCardSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Skeleton variant="rectangular" height={153} />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </CardContent>
    </Card>
  );
}
