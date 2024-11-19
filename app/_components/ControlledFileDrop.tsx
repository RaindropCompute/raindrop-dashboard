"use client";

import { Box } from "@mui/joy";
import { useDropzone } from "react-dropzone";
import { Control, FieldValues, Path, useController } from "react-hook-form";

export default function ControlledFileDrop<T extends FieldValues>({
  control,
  name,
}: {
  control: Control<T>;
  name: Path<T>;
}) {
  const { field } = useController({ name, control });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => field.onChange(files[0] ?? null),
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        borderColor: isDragActive
          ? "primary.outlinedBorder"
          : "neutral.outlinedBorder",
        borderStyle: "dashed",
        borderRadius: 6,
        p: 2,
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {field.value ? (
        <p>{field.value.name}</p>
      ) : (
        <p>Drag some files here, or click to select files</p>
      )}
    </Box>
  );
}
