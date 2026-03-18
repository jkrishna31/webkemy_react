export function getOpenParameters(options: {
  zoom: "page-width" | "page-height" | "page-fit" | "auto" | number[];
  namedDest: string;
  page?: number;
  search?: string;
  view?: "Fit" | "FitH" | "FitV" | "FitB" | "FitBH" | "FitBV";

  pageMode: "none" | "thumbs" | "bookmarks" | "attachments" | "layers";

  scrollbar?: 0 | 1; // turns the scrollbars on/off
  toolbar?: 0 | 1; // turns the toolbar on/off
  statusbar?: 0 | 1; // turns the status bar on/off
  messages?: 0 | 1; // turns the doc message bar on/off
}) {

}
