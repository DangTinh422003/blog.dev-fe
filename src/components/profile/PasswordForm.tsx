import { Field, Form, Formik } from 'formik';
import { KeyRound, KeySquare, Lock } from 'lucide-react';
import React from 'react';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordInitialValues: PasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const PasswordChangeSchema = Yup.object().shape<
  Record<keyof PasswordFormValues, Yup.AnySchema>
>({
  currentPassword: Yup.string().required('Current password is required!'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    )
    .required('New password is required!'),
  confirmPassword: Yup.string()
    .required('Confirm password is required!')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});
const PasswordForm = () => {
  const handleSubmitForm = (values: PasswordFormValues) => {
    console.log(values);
  };
  return (
    <div>
      <Formik
        initialValues={PasswordInitialValues}
        validationSchema={PasswordChangeSchema}
        onSubmit={handleSubmitForm}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <h1 className="font-bold">Change password</h1>

              <div className="mt-4 grid grid-cols-1 gap-6">
                <div className="w-full">
                  <label
                    className="ml-2 text-xs font-medium text-textGray/80"
                    htmlFor="currentPassword"
                  >
                    Current Password
                  </label>
                  <div
                    className={`
                      flex w-full items-center gap-3 rounded-full bg-secondary
                      px-2 py-4
                    `}
                  >
                    <Field
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      placeholder="Enter current password"
                      className={`
                        w-full border-none bg-transparent px-3 text-sm
                        outline-none

                        hover:border-none hover:outline-none
                      `}
                    />
                  </div>
                  {errors.currentPassword && touched.currentPassword && (
                    <p className="mt-2 text-sm italic text-red-500">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label
                    className="ml-2 text-xs font-medium text-textGray/80"
                    htmlFor="newPassword"
                  >
                    New Password
                  </label>
                  <div
                    className={`
                      flex w-full items-center gap-3 rounded-full bg-secondary
                      px-2 py-4
                    `}
                  >
                    <Field
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="Enter new password"
                      className={`
                        w-full border-none bg-transparent px-3 text-sm
                        outline-none

                        hover:border-none hover:outline-none
                      `}
                    />
                  </div>
                  {errors.newPassword && touched.newPassword && (
                    <p className="mt-2 text-sm italic text-red-500">
                      {errors.newPassword}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label
                    className="ml-2 text-xs font-medium text-textGray/80"
                    htmlFor="email"
                  >
                    Confirm Password
                  </label>
                  <div
                    className={`
                      flex w-full items-center gap-3 rounded-full bg-secondary
                      px-2 py-4
                    `}
                  >
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Enter confirm password"
                      className={`
                        w-full border-none bg-transparent px-3 text-sm
                        outline-none

                        hover:border-none hover:outline-none
                      `}
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="mt-2 text-sm italic text-red-500">
                      {errors.confirmPassword}
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

export default PasswordForm;
