import { SVGProps } from "@/lib/types/prop";

const LayoutIcon = (props: SVGProps) => {
  return (
    // <!-- Icon from Meteor Icons by zkreations - https://github.com/zkreations/icons/blob/main/LICENSE -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><g><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18M9 21V9" /></g></svg>
    // <!-- Icon from ProIcons by ProCode - https://github.com/ProCode-Software/proicons/blob/main/LICENSE -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" {...props}><path d="M2.75 8.75v8a3 3 0 0 0 3 3H10m-7.25-11v-1.5a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v1.5m-18.5 0H10m11.25 0v8a3 3 0 0 1-3 3H10m11.25-11H10m0 0v11" /></svg>
    // <!-- Icon from Huge Icons by Hugeicons - undefined -->
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><g><path strokeLinecap="round" strokeLinejoin="round" d="M3.891 20.109C2.5 18.717 2.5 16.479 2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391" /><path d="M2.5 9h19M8 21.5V9" /></g></svg>
    // <!-- Icon from Mage Icons by MageIcons - https://github.com/Mage-Icons/mage-icons/blob/main/License.txt -->
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><g><path strokeLinecap="round" strokeLinejoin="round" d="M2.75 9.167h18.5" /><path strokeLinecap="square" strokeLinejoin="round" d="M9.167 21.25V9.167" /><rect width="18.5" height="18.5" x="2.75" y="2.75" rx="6" /></g></svg>
  );
};

export default LayoutIcon;
