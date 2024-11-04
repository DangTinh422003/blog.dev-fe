'use client';

import { Field, Form, Formik } from 'formik';
import { Camera } from 'lucide-react';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import { useShowImage } from '@/hooks/useShowImage';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';

export interface ProfileFormProps {
  user: {
    image: string;
    name: string;
    username: string;
    email: string;
  };
}

export interface ProfileFormValues {
  image: string | File;
  name: string;
  username: string;
  email: string;
}

export const ProfileChangeSchema = Yup.object().shape<
  Record<keyof ProfileFormValues, Yup.AnySchema>
>({
  image: Yup.mixed(),
  name: Yup.string().required('Name is required!'),
  email: Yup.string().email('Email is invalid!').required('Email is required!'),
  username: Yup.string().required('Username is required!'),
});

const ProfileForm = ({ user }: ProfileFormProps) => {
  const {
    uploadImageInput,
    showImageRef,
    handleFileInputClick,
    handleShowImage,
  } = useShowImage();
  const profileFormInitialValues: ProfileFormValues = {
    image: user.image,
    name: user.name,
    username: user.username,
    email: user.email,
  };
  const handleSubmitForm = (values: ProfileFormValues) => {
    console.log(values);
  };

  return (
    <div>
      <Formik
        initialValues={profileFormInitialValues}
        validationSchema={ProfileChangeSchema}
        onSubmit={handleSubmitForm}
      >
        {({ errors, touched, ...props }) => {
          return (
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
              <Button
                className={`
                  mt-6 flex h-24 items-center justify-start gap-4 rounded-3xl
                  bg-secondary pl-0 pr-5

                  sm:hidden
                `}
                onClick={handleFileInputClick}
              >
                <Avatar className="size-24 rounded-3xl">
                  <AvatarImage
                    ref={showImageRef}
                    src={user.image}
                    alt={user.username}
                    className="size-full object-cover"
                  />
                  <AvatarFallback>
                    {user.name.split(' ')[0].split('')[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2 font-bold text-foreground">
                  <Camera size={28} />
                  <p>Upload your image</p>
                </div>
              </Button>
              <Input
                ref={uploadImageInput}
                type="file"
                className="hidden"
                onChange={async (e) => {
                  await props.setFieldValue('image', e.target.files?.[0]);
                  handleShowImage(e);
                }}
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
                <div className="w-full">
                  <label
                    className="ml-2 text-xs font-medium text-textGray/80"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <div
                    className={`
                      flex w-full items-center gap-3 rounded-full bg-secondary
                      px-2 py-4
                    `}
                  >
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      placeholder={user.username}
                      className={`
                        w-full border-none bg-transparent px-3 text-sm
                        outline-none

                        hover:border-none hover:outline-none
                      `}
                    />
                  </div>
                  {errors.username && touched.username && (
                    <p className="mt-2 text-sm italic text-red-500">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label
                    className="ml-2 text-xs font-medium text-textGray/80"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div
                    className={`
                      flex w-full items-center gap-3 rounded-full bg-secondary
                      px-2 py-4
                    `}
                  >
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder={user.username}
                      className={`
                        w-full border-none bg-transparent px-3 text-sm
                        outline-none

                        hover:border-none hover:outline-none
                      `}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="mt-2 text-sm italic text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label
                    className="ml-2 text-xs font-medium text-textGray/80"
                    htmlFor="email"
                  >
                    Full Name
                  </label>
                  <div
                    className={`
                      flex w-full items-center gap-3 rounded-full bg-secondary
                      px-2 py-4
                    `}
                  >
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder={user.name}
                      className={`
                        w-full border-none bg-transparent px-3 text-sm
                        outline-none

                        hover:border-none hover:outline-none
                      `}
                    />
                  </div>
                  {errors.name && touched.name && (
                    <p className="mt-2 text-sm italic text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>
              <Button type="submit" className="mt-6">
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProfileForm;
