import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import FormField from '@/components/profile/FormField';
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
        <Form>
          <h1 className="font-bold">Change password</h1>

          <div className="mt-4 grid grid-cols-1 gap-6">
            <FormField
              name="currentPassword"
              label="Current Password"
              type="password"
              placeholder="Enter current password"
            />
            <FormField
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter new password"
            />
            <FormField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Enter confirm password"
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

export default PasswordForm;
