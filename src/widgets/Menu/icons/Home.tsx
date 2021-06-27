import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="17.27" height="18.106" viewBox="0 0 17.27 18.106" {...props}>
      <g id="Group_603" data-name="Group 603" transform="translate(0.75 0.75)">
        <path id="Path_8300" data-name="Path 8300" d="M-61.975,171.346V180.9h15.77v-9.555l-7.777-7.051Z" transform="translate(61.975 -164.295)" fill="none" stroke="#c5835f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
        <line id="Line_18" data-name="Line 18" y2="4.193" transform="translate(7.885 8.303)" fill="none" stroke="#c5835f" strokeLinecap="round" strokeWidth="1.5"/>
      </g> 
    </Svg>
  
    // <Svg viewBox="0 0 24 24" {...props}>
    //   <path d="M9.99998 19V14H14V19C14 19.55 14.45 20 15 20H18C18.55 20 19 19.55 19 19V12H20.7C21.16 12 21.38 11.43 21.03 11.13L12.67 3.59997C12.29 3.25997 11.71 3.25997 11.33 3.59997L2.96998 11.13C2.62998 11.43 2.83998 12 3.29998 12H4.99998V19C4.99998 19.55 5.44998 20 5.99998 20H8.99998C9.54998 20 9.99998 19.55 9.99998 19Z" />
    // </Svg>
  );
};

export default Icon;
