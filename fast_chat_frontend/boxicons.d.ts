// boxicons.d.ts
declare namespace JSX {
    interface IntrinsicElements {
      'box-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name?: string;
        type?: string;
        size?: string;
        color?: string;
        animation?: string;
        flip?: string;
      };
    }
  }
  