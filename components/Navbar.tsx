"use client";

import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import { Stack, Box, Typography } from "@mui/joy";

export default function Navbar() {
  return (
    <Stack
      sx={{ bgcolor: "background.level1", px: 2, py: 1 }}
      spacing={2}
      direction="row"
      alignItems="center"
    >
      <Box>
        <Typography level="title-lg">Raindrop</Typography>
      </Box>
      <Box flex="1" />

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <OrganizationSwitcher />
        <UserButton />
      </SignedIn>
    </Stack>
  );
}
