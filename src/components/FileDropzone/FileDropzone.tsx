import { ReactElement, useEffect, useState } from 'react';

import { Text, Group, useMantineTheme, Button } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone';

import { ImageIcon, UploadIcon, CrossCircledIcon } from '@modulz/radix-icons';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

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

  const [droppedFile, setDroppedFile] = useState<File | null>(null)
  // const [resultFile, setResultFile] = useState<string | null>(null)
  // const [statusMessage, setStatueMessage] = useState<string>('')

  const ffmpeg = createFFmpeg({
    log: true,
  });

  const doTranscode = async () => {
    // setStatueMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    // setStatueMessage('Start transcoding');
    ffmpeg.FS('writeFile', 'test.avi', await fetchFile('/flame.avi'));
    await ffmpeg.run('-i', 'test.avi', 'test.mp4');
    // setStatueMessage('Complete transcoding');
    // const data = ffmpeg.FS('readFile', 'test.mp4');
    // setResultFile(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  };

  useEffect(() => {
    console.log(droppedFile)
  }, [droppedFile])

  return (
    <>
      <Dropzone onDrop={(files) => setDroppedFile(files[0])}>
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
      <Button onClick={doTranscode}>translate</Button>
    </>
  )
}

export default FileDropzone;
