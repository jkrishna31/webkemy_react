import { AppleLogo, FacebookLogo, GithubLogo, GoogleLogo, MicrosoftLogo, TwitterLogo } from "@/lib/ui/svgs/logos";

import styles from "./AuthForm.module.scss";

const providers = [
  {
    id: "google",
    icon: <GoogleLogo className={styles.provider_icon} />,
    label: "Google",
  },
  {
    id: "apple",
    icon: <AppleLogo className={styles.provider_icon} />,
    label: "Apple",
  },
  {
    id: "microsoft",
    icon: <MicrosoftLogo className={styles.provider_icon} />,
    label: "Microsoft",
  },
  {
    id: "github",
    icon: <GithubLogo className={styles.provider_icon} />,
    label: "Github",
  },
  // {
  //   id: "twitter",
  //   icon: <TwitterLogo className={styles.provider_icon} />,
  //   label: "Twitter",
  // },
  // {
  //   id: "facebook",
  //   icon: <FacebookLogo className={styles.provider_icon} />,
  //   label: "Facebook",
  // },
];

const AuthProviders = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.providers}>
        {
          providers.map((item) => (
            <button key={item.id} className={styles.provider}>
              {item.icon}
              <p>{item.label}</p>

              {/* <div className={styles.presentation}>
                <ArrowRightIcon />
              </div> */}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default AuthProviders;
