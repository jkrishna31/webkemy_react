import { ComponentProps } from "react";

import { SVGProps } from "@/types/prop.types";

import styles from "./DotsLoader.module.scss";

export interface DotsLoaderProps extends ComponentProps<"div"> {

}

const DotsLoader = (props: SVGProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}>
            <circle cx="4" cy="12" r="1.5" fill="currentColor">
                <animate attributeName="r" dur="0.75s" repeatCount="indefinite" values="1.5;3;1.5" />
            </circle>
            <circle cx="12" cy="12" r="3" fill="currentColor">
                <animate attributeName="r" dur="0.75s" repeatCount="indefinite" values="3;1.5;3" />
            </circle>
            <circle cx="20" cy="12" r="1.5" fill="currentColor">
                <animate attributeName="r" dur="0.75s" repeatCount="indefinite" values="1.5;3;1.5" />
            </circle>
        </svg>
        // <div className={styles.loader}></div>
    );
};

export default DotsLoader;
