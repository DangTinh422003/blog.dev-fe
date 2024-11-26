'use client';

import { Form, Formik } from 'formik';
import _ from 'lodash';
import { Camera } from 'lucide-react';
import * as Yup from 'yup';

import FormField from '@/components/profile/FormField';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { selectUser } from '@/stores/features/auth/authSlice';
import { useAppSelector } from '@/stores/store';

export interface ProfileFormValues {
  image: string;
  fullName: string;
  email: string;
}

export const ProfileChangeSchema = Yup.object().shape<
  Record<keyof ProfileFormValues, Yup.AnySchema>
>({
  image: Yup.mixed(),
  fullName: Yup.string().required('Name is required!'),
  email: Yup.string().email('Email is invalid!').required('Email is required!'),
});

const ProfileForm = () => {
  const newUser = useAppSelector(selectUser);
  const profileFormInitialValues: Partial<ProfileFormValues> = _.assign(
    {},
    {
      fullName: newUser?.email.substring(0, newUser.email.indexOf('@')),
      email: newUser?.email,
    },
  );
  const handleImageOnchange = () => {};
  const handleSubmitForm = () => {};

  if (!newUser) return null;
  return (
    <div>
      <Formik
        initialValues={profileFormInitialValues}
        validationSchema={ProfileChangeSchema}
        onSubmit={handleSubmitForm}
      >
        <Form>
          <h1
            className={`
              text-xl font-bold

              sm:hidden
            `}
          >
            Profile picture
          </h1>
          <p className="sm:hidden">
            Upload a picture to make your profile stand out and let people
            recognize your comments and contributions easily!
          </p>
          <label
            htmlFor="image"
            className={`
              mt-6 inline-flex h-24 cursor-pointer items-center justify-start
              gap-4 rounded-3xl bg-secondary pl-0 pr-5

              sm:hidden
            `}
          >
            <Avatar className="size-24 rounded-3xl">
              <AvatarImage
                src={newUser?.avatar || 'https://github.com/shadcn.png'}
                className="size-full object-cover"
              />
              <AvatarFallback>
                {newUser.email?.split(' ')[0].split('')[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-2 font-bold text-foreground">
              <Camera size={28} />
              <p>Upload your image</p>
            </div>
          </label>
          <Input
            id="image"
            type="file"
            className="hidden"
            onChange={handleImageOnchange}
          />

          <h1
            className={`
              mt-10 font-bold

              sm:mt-0
            `}
          >
            Account information
          </h1>

          <div className="mt-4 grid grid-cols-1 gap-6">
            <FormField name="email" label="Email" type="email" />
            <FormField
              name="fullName"
              label="Full name"
              type="text"
              placeholder="Enter your full name"
            />
          </div>
          <Button type="submit" className="mt-6">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfileForm;
