'use client';

import React from 'react';

import PasswordForm from '@/components/profile/PasswordForm';
import ProfileForm from '@/components/profile/ProfileForm';
import UploadImage from '@/components/profile/UploadImage';
import { Button } from '@/components/ui/button';
import { profileUser } from '@/constants/mockData';

const Profile = () => {
  const [formType, setFormType] = React.useState('general');
  const handleChangeForm = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const type = e.currentTarget.dataset.type;
      const general = 'general';
      const password = 'password';
      setFormType(type === general ? general : password);
    },
    [],
  );
  return (
    <div
      className={`
        mx-auto max-w-6xl rounded-md px-0 py-2

        sm:px-6
      `}
    >
      <div
        className={`
          flex flex-col items-start gap-4

          sm:flex-row sm:px-0
        `}
      >
        <UploadImage user={profileUser} />
        <div className="w-full flex-1 rounded-md shadow-2xl shadow-slate-300">
          <div className="bg-secondary px-8 pt-4">
            <h1 className="my-3 text-lg font-bold">Edit Profile</h1>
            <div className="flex gap-6">
              <Button
                data-type="general"
                onClick={handleChangeForm}
                className={`
                  rounded-none border-x-0 border-t-0 bg-transparent px-0 text-xs
                  font-medium text-textGray opacity-75

                  hover:border-x-0 hover:border-b-4 hover:border-t-0
                  hover:border-primary
                `}
              >
                User Info
              </Button>
              <Button
                data-type="password"
                onClick={handleChangeForm}
                className={`
                  rounded-none border-x-0 border-t-0 bg-transparent px-0 text-xs
                  font-medium text-textGray opacity-75

                  hover:border-x-0 hover:border-b-4 hover:border-t-0
                  hover:border-primary
                `}
              >
                Change Password
              </Button>
            </div>
          </div>

          <div className="px-8 py-4">
            {formType === 'password' && <PasswordForm />}
            {formType === 'general' && <ProfileForm user={profileUser} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
