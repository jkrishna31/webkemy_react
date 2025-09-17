import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

const IntlProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NextIntlClientProvider>
      {children}
    </NextIntlClientProvider>
  );
};

export default IntlProvider;
