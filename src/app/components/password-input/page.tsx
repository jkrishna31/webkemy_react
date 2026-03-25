import { PageSetup } from "@/components/managers";
import { PasswordInput } from "@/lib/components/elements/inputs/PasswordInput";

const Page = () => {
  return (
    <main>
      <PageSetup pageKey="password-input" />

      <PasswordInput style={{ maxWidth: "36rem" }} />
    </main>
  );
};

export default Page;
