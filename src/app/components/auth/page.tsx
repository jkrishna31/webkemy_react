import { PageSetup } from "@/components/managers";
import { CreatePasswordForm, ResetPasswordForm, SignInForm, SignUpForm } from "@/lib/components/blocks/auth-form";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="auth" />

      <SignUpForm />
      <SignInForm />
      <ResetPasswordForm />
      <CreatePasswordForm />
    </main>
  );
};

export default Page;
