import { PageSetup } from "@/components/managers";
import { OtpInput } from "@/lib/ui/elements/inputs/OtpInput";

const Page = () => {
  return (
    <main>
      <PageSetup pageKey="otp-input" />

      <OtpInput />
    </main>
  );
};

export default Page;
