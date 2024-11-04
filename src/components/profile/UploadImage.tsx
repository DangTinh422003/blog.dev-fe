import React from 'react';

import { type ProfileFormProps } from '@/components/profile/ProfileForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useShowImage } from '@/hooks/useShowImage';

import { Input } from '../ui/input';

const UploadImage = ({ user }: ProfileFormProps) => {
  const {
    uploadImageInput,
    showImageRef,
    handleFileInputClick,
    handleShowImage,
  } = useShowImage();
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
      <h1 className="mt-3 text-center font-bold">{user.name}</h1>
      <span className="mt-2 text-center text-sm text-textGray">
        @{user.name.split(' ')[0]}
      </span>

      <Button
        className="mt-3 size-24 rounded-full bg-transparent p-0"
        onClick={handleFileInputClick}
      >
        <Avatar className="size-full rounded-full object-cover">
          <AvatarImage
            className="size-full object-cover"
            ref={showImageRef}
            src={user.image}
            alt={user.name}
          />
          <AvatarFallback>
            {user.name.split(' ')[0].split('')[0]}
          </AvatarFallback>
        </Avatar>
      </Button>
      <Button
        className="mt-2 w-2/3 rounded-lg text-sm"
        onClick={handleFileInputClick}
      >
        Upload
      </Button>
      <Input
        ref={uploadImageInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleShowImage(e);
        }}
      />
      <div className="mt-3 rounded-md bg-darkGray px-1 py-3 text-center text-xs">
        <p>Upload a new avatar. Larger image will be resized</p>
        <p className="mt-2">
          Maximum upload size: <span className="font-bold">1MB</span>
        </p>
      </div>
      <div className="mt-4 flex gap-1 text-center text-xs">
        <p>Username: </p>
        <p className="font-bold">{user.username}</p>
      </div>
    </div>
  );
};

export default UploadImage;
