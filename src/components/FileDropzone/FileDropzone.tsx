import { ReactElement } from 'react';

import { Text, Group, useMantineTheme } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone';

import { ImageIcon, UploadIcon, CrossCircledIcon } from '@modulz/radix-icons';

type ImageUploadIconProps = {
  status: any;
  style: any;
}

const ImageUploadIcon = ({ status, style }: ImageUploadIconProps): ReactElement => {
  if (status.accepted) {
    return <UploadIcon style={style} />;
  }

  if (status.rejected) {
    return <CrossCircledIcon style={style} />;
  }

  return <ImageIcon style={style} />;
}

const getIconColor = (status: any, theme: any) => {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.black;
}


const FileDropzone = (): ReactElement => {
  const theme = useMantineTheme()

  return (
    <Dropzone onDrop={console.log}>
      {(status) => (
        <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
          <ImageUploadIcon
            status={status}
            style={{ width: 80, height: 80, color: getIconColor(status, theme) }}
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
      )}
    </Dropzone>
  )
}

export default FileDropzone;
