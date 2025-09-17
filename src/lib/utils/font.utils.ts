import { Comfortaa, Inter, Manrope, Schibsted_Grotesk } from "next/font/google";
import localFont from "next/font/local";

const comfortaa = Comfortaa({
    variable: "--font-comfortaa",
    subsets: ["latin-ext"],
    weight: ["300", "400", "500", "600", "700"],

});

const sg = Schibsted_Grotesk({
    variable: "--font-sg",
    subsets: ["latin-ext"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin-ext"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const figtree = Inter({
    variable: "--font-figtree",
    subsets: ["latin-ext"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

// const uncutSans = localFont({
//     src: "../../../public/fonts/uncutSans/UncutSans-Variable.woff2",
//     display: "swap",
//     variable: "--font-uncut-sans"
// });

// const uncutSans = localFont({
//     src: [
//         {
//             path: "../../../public/fonts/uncutSans/UncutSans-Regular.woff",
//             weight: "400",
//             style: "normal"
//         },
//         {
//             path: "../../../public/fonts/uncutSans/UncutSans-Medium.woff",
//             weight: "500",
//             style: "medium"
//         },
//         {
//             path: "../../../public/fonts/uncutSans/UncutSans-Semibold.woff",
//             weight: "600",
//             style: "semibold"
//         },
//         {
//             path: "../../../public/fonts/uncutSans/UncutSans-Bold.woff",
//             weight: "700",
//             style: "bold"
//         },
//     ],
//     variable: "--font-uncut-sans",
//     display: "swap",
// });

export const font_comfortaa = comfortaa.variable;
export const font_sg = sg.variable;
export const font_manrope = manrope.variable;
export const font_figtree = figtree.variable;
