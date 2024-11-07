'use client';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import AvatarEditor from 'react-avatar-editor';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { selectUser } from '@/stores/features/auth/authSlice';
import { useAppSelector } from '@/stores/store';

const UploadImage = () => {
  const [previewImage, setPreviewImage] = React.useState<
    string | ArrayBuffer | undefined
  >();
  const imageRef = React.useRef<AvatarEditor>(null);
  const [scale, setScale] = React.useState<number>(1);
  const user = useAppSelector(selectUser);
  const handleScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };
  const handleChangeImage = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            setPreviewImage(e.target.result);
          }
        };
      }
    },
    [],
  );
  const handleCloseImageModal = () => {
    setPreviewImage(undefined);
  };

  const handleUploadImage = () => {
    if (imageRef.current) {
      const canvas = imageRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        const file = new File([blob as Blob], 'avatar.png', {
          type: 'image/png',
        });
        console.log(file);
      });
    }
  };
  if (!user) return null;
  return (
    <div
      className={`
        hidden flex-col items-center rounded-lg px-3 py-4 shadow-2xl
        shadow-slate-300

        md:w-1/3

        sm:flex sm:w-1/2

        xl:w-1/4
      `}
    >
      <h1 className="mt-3 text-center font-bold">
        {user.fullName
          ? user.fullName
          : user?.email.substring(0, user.email.indexOf('@'))}
      </h1>
      <span className="mt-2 text-center text-sm text-textGray">
        @
        {user.fullName
          ? user.fullName
          : user.email.substring(0, user.email.indexOf('@'))}
      </span>

      <div className="mt-3 size-24 rounded-full bg-transparent p-0">
        <Avatar className="size-full rounded-full object-cover">
          <AvatarImage
            className="size-full object-cover"
            src={user.image || ''}
          />
          <AvatarFallback>
            {user.email.split('')[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <label
        htmlFor="image"
        className={`
          mt-2 flex h-10 w-2/3 cursor-pointer items-center justify-center
          rounded-lg bg-primary text-sm text-primary-foreground

          hover:border hover:border-primary hover:bg-transparent
          hover:text-accent-foreground
        `}
      >
        Upload
      </label>
      <Input
        id="image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChangeImage}
      />

      <div className="mt-3 rounded-md bg-darkGray px-1 py-3 text-center text-xs">
        <p>Upload a new avatar. Larger image will be resized</p>
        <p className="mt-2">
          Maximum upload size: <span className="font-bold">1MB</span>
        </p>
      </div>
      <div className="mt-4 flex gap-1 text-center text-xs">
        <p>Username: </p>
        <p className="font-bold">
          {user.email.substring(0, user.email.indexOf('@'))}
        </p>
      </div>
      {previewImage && (
        <div
          className={`
            fixed inset-0 z-10 mt-6 flex flex-col items-center justify-center
            bg-black bg-opacity-50
          `}
        >
          <div
            className={`
              flex h-5/6 w-1/2 flex-col items-center rounded-lg bg-secondary
            `}
          >
            <h1
              className={`
                mb-6 w-full border-b py-6 text-center text-xl font-bold
              `}
            >
              Choose your avatar
            </h1>
            {typeof previewImage === 'string' && (
              <AvatarEditor
                image={previewImage}
                ref={imageRef}
                border={50}
                borderRadius={100}
                backgroundColor="transparent"
                scale={scale}
                className="size-1/2"
              />
            )}
            <div className="flex w-1/2 items-center gap-2">
              <Minus size={24} />
              <Input
                type="range"
                min={1}
                max={2}
                step={0.01}
                value={scale}
                onChange={handleScale}
              />
              <Plus size={24} />
            </div>
            <div
              className={`
                mt-auto flex w-full items-center justify-end gap-2 border-t-2
                p-4
              `}
            >
              <Button
                onClick={handleCloseImageModal}
                className="mt-2 bg-secondary text-foreground"
              >
                Cancel
              </Button>
              <Button onClick={handleUploadImage} className="mt-2">
                Save avatar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
