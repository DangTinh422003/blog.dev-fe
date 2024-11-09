'use client';

import { cva } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';

import PasswordForm from '@/components/profile/PasswordForm';
import ProfileForm from '@/components/profile/ProfileForm';
import UploadImage from '@/components/profile/UploadImage';
import { Button } from '@/components/ui/button';
import { selectUser } from '@/stores/features/auth/authSlice';
import { useAppSelector } from '@/stores/store';

enum FormType {
  GENERAL = 'general',
  PASSWORD = 'password',
}

const ButtonCheck = Object.values(FormType);

const buttonTypeVariants = cva(
  `
    rounded-none border-x-0 border-t-0 bg-transparent px-0 text-xs font-medium
    text-textGray opacity-75

    hover:border-x-0 hover:border-b-4 hover:border-t-0 hover:border-primary
  `,
);

const Profile = () => {
  const [formType, setFormType] = React.useState<`${FormType}`>(
    FormType.GENERAL,
  );
  const router = useRouter();
  const user = useAppSelector(selectUser);
  useLayoutEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user]);
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
        <UploadImage />
        <div className="w-full flex-1 rounded-md shadow-2xl shadow-slate-300">
          <div className="bg-secondary px-8 pt-4">
            <h1 className="my-3 text-lg font-bold">Edit Profile</h1>
            <div className="flex gap-6">
              {ButtonCheck.map((item) => {
                return (
                  <Button
                    key={item}
                    data-type={item}
                    onClick={() => {
                      setFormType(item);
                    }}
                    className={buttonTypeVariants()}
                  >
                    {item == FormType.GENERAL ? 'User Info' : 'Change password'}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="px-8 py-4">
            {formType === FormType.GENERAL ? <ProfileForm /> : <PasswordForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
