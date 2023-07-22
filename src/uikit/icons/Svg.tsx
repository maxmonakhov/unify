import { SVGProps } from 'react';

export type SvgProps = SVGProps<SVGSVGElement>;

export const Svg = (props: SvgProps) => {
  return <svg xmlns="http://www.w3.org/2000/svg" {...props} />;
};
