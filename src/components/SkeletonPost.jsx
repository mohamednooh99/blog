import { Card, CardHeader, CardContent, Skeleton, Box } from "@mui/material";

function SkeletonPost() {
  return (
    <Card sx={{ maxWidth: 400, marginBottom: 2, p: 2 }}>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={<Skeleton width="60%" />}
        subheader={<Skeleton width="40%" />}
        action={<Skeleton variant="circular" width={32} height={32} />}
      />
      <Skeleton variant="rectangular" height={194} sx={{ mb: 2 }} />
      <CardContent>
        <Skeleton width="30%" height={32} sx={{ mb: 1 }} />
        <Skeleton width="80%" height={28} sx={{ mb: 1 }} />
        <Skeleton width="95%" height={20} />
      </CardContent>
    </Card>
  );
}

export default SkeletonPost;
