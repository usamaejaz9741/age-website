interface Window {
  gtag: (
    command: 'event',
    action: string,
    params: {
      page_title?: string;
      page_location?: string;
      event_category?: string;
      event_label?: string;
      value?: number;
      [key: string]: string | number | boolean | undefined;
    }
  ) => void;
}

declare const gtag: Window['gtag'];