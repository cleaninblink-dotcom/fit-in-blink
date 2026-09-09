/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'amp-ad': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          layout?: string;
          width?: string | number;
          height?: string | number;
          type?: string;
          'data-ad-client'?: string;
          'data-ad-slot'?: string;
          [key: string]: any;
        };
      }
    }
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'amp-ad': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      layout?: string;
      width?: string | number;
      height?: string | number;
      type?: string;
      'data-ad-client'?: string;
      'data-ad-slot'?: string;
      [key: string]: any;
    };
  }
}
