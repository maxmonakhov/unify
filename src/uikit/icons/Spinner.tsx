import { Svg, SvgProps } from "./Svg";

export const SpinnerIcon = (props: SvgProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <g clipPath="url(#clip0_1714_1922)">
        <path d="M23.16 12C23.6239 12 24.0031 12.3766 23.9706 12.8394C23.8138 15.0761 23.0327 17.2304 21.7082 19.0534C20.2187 21.1036 18.1183 22.6296 15.7082 23.4127C13.2981 24.1958 10.7019 24.1958 8.2918 23.4127C5.88167 22.6296 3.78133 21.1036 2.2918 19.0534C0.802259 17.0033 -2.21542e-07 14.5342 0 12C2.21543e-07 9.46585 0.80226 6.99675 2.2918 4.94658C3.78133 2.8964 5.88168 1.37042 8.2918 0.587321C10.4349 -0.109019 12.7251 -0.186163 14.9008 0.355889C15.351 0.468041 15.592 0.944996 15.4486 1.38621C15.3053 1.82742 14.8319 2.0653 14.3805 1.95829C12.5436 1.52282 10.6165 1.59842 8.81095 2.1851C6.73824 2.85856 4.93195 4.17091 3.65095 5.93406C2.36994 7.6972 1.68 9.82063 1.68 12C1.68 14.1794 2.36994 16.3028 3.65094 18.0659C4.93195 19.8291 6.73824 21.1414 8.81094 21.8149C10.8836 22.4884 13.1164 22.4884 15.1891 21.8149C17.2618 21.1414 19.0681 19.8291 20.3491 18.0659C21.465 16.53 22.1324 14.7207 22.2858 12.8391C22.3236 12.3767 22.6961 12 23.16 12Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_1714_1922">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </Svg>
  );
};
