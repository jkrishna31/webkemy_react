import { PageSetup } from "@/components/managers";
import { CreatePasswordForm, ResetPasswordForm, SignInForm, SignUpForm } from "@/lib/ui/blocks/AuthForm";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.main}>
      <PageSetup pageKey="auth" />

      <SignUpForm />
      <ResetPasswordForm />
      <SignInForm />
      <CreatePasswordForm />
    </main>
  );
};

export default Page;
