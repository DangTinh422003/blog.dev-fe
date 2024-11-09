'use client';

import 'react-advanced-cropper/dist/style.css';

import React from 'react';
import { Cropper, type CropperRef } from 'react-advanced-cropper';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { selectUser } from '@/stores/features/auth/authSlice';
import { useAppSelector } from '@/stores/store';
// import { dataUrlToFile } from '@/utils/dataUrlToFile.util';

const UploadImage = () => {
  const [previewImage, setPreviewImage] = React.useState<string>();
  const [cropper, setCropper] = React.useState<CropperRef>();
  const user = useAppSelector(selectUser);

  const handleChangeImage = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleCloseImageModal = () => {
    setPreviewImage(undefined);
  };
  const handleChange = (cropper: CropperRef) => {
    setCropper(cropper);
  };

  const handleUploadImage = () => {
    if (cropper) {
      const cropData = cropper.getCanvas()?.toDataURL();
      if (cropData) {
        // const file = dataUrlToFile(cropData, 'output.png');
        //Upload image here
        setPreviewImage(undefined);
      }
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
            src={user.avatar || 'https://github.com/shadcn.png'}
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
            bg-black bg-opacity/50
          `}
        >
          <div
            className={`
              flex h-5/6 w-1/2 flex-col items-center rounded-lg bg-secondary
            `}
          >
            <h2
              className={`
                mb-6 w-full border-b py-6 text-center text-xl font-bold
              `}
            >
              Choose your avatar
            </h2>
            <Cropper
              style={{ height: 400, width: '100%' }}
              src={previewImage}
              className={'cropper'}
              onChange={handleChange}
            />
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
