import { Group, Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';

type Prop = {
  form: any;
  label: string;
};

export const ImageUpload = ({ form, label }: Prop) => {
  const theme = useMantineTheme();

  const convertToFile = (file: File) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const string = reader.result;
      if (!string) return;
      form.setFieldValue(label, _convertToFile(string, file));
    });

    if (file) reader.readAsDataURL(file);
  };

  const _convertToFile = (string: string, file: File) => {
    const blob = window.atob(string.replace(/^.*,/, ''));
    let buffer = new Uint8Array(blob.length);
    for (let i = 0; i < blob.length; i++) buffer[i] = blob.charCodeAt(i);
    return new File([buffer.buffer], file.name, { type: file.type });
  };

  return (
    <Dropzone
      onDrop={(files) => convertToFile(files[0])}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      // py={92}
    >
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
};

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme
) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: 'none' }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

const getIconColor = (status: DropzoneStatus, theme: MantineTheme) => {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
};
