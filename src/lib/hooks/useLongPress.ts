import { RefObject, useState } from "react";

export type TLongPressOptions = {

};

export function useLongPress(ref: RefObject<HTMLElement | null>) {
  const [_start, setStart] = useState(false);

  // flow:
  // on touchstart -> start the longPress detection (add the touchend event listener)
  // keep increasing the duration counter
  // if counter reaches the threshold, then emit the longPress event or trigger the callback; and reset the 
  // on touchend -> clear the longPress detection
}
