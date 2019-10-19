import { Button, Form, Icon, Input } from 'antd';
import { FormikErrors, FormikProps, withFormik } from 'formik';
import * as React from 'react';

const FormItem = Form.Item;

interface FormValues {
    email: string;
    password: string;
}

interface Props {
// expecting FormikErrors to be returned
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}
// wrapped C with a HOC (Formik) now we have access to props
class C extends React.PureComponent<FormikProps<FormValues> & Props>{
  render() {
    const {values, handleSubmit, handleChange, handleBlur} = this.props;
    return (
      <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
        <div style={{ width: 400, margin: 'auto'}}>
            <FormItem>
                <Input
                // formik requires namefield on input
                    name="email"
                    prefix={<Icon type="user" style={{ color: "rgba(0, 0, 0, .25)" }} />}
                    placeholder="Email"
                    value={values.email}
                // formik handles the change fn based on the name: "email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormItem>
            <FormItem>
                <Input
                    name="password"
                    prefix={<Icon type="lock" style={{ color: "rgba(0, 0, 0, .25)" }} />}
                    type="password"
                    placeholder="Password"
                    value={values.password}
                // formik handles the change fn based on the name: "password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </FormItem>
            <FormItem>
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </FormItem>
            <FormItem>
            <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
            >
                Register
            </Button>
            </FormItem>
            <FormItem>
            Or <a href="">Login now!</a>
            </FormItem>
        </div>
      </form>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
// access to props
    mapPropsToValues: () => ({ email: '', password: '' }),
// handleSubmit is called whenever form is submitted
    handleSubmit: async (values, {props, setErrors}) => {
// RegisterView should receive submit as a prop
        const errors = await props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    }
})(C);