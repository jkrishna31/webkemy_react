import { PageSetup } from "@/components/managers";
import { OtpInput } from "@/lib/components/elements/otp-input";

const Page = () => {
  return (
    <main>
      <PageSetup pageKey="otp-input" />

      <OtpInput />
    </main>
  );
};

export default Page;
