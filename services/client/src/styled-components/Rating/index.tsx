import styled from "styled-components";
import { device } from "../size";

type PaginationProps = {
  current?: boolean;
};

// ${(props) =>
//     props.current
//       ? `
//   label {
//     font-weight: 600;
//   }
//   border: 1px solid #172024;
//   `
//       : ""}

export const Rating = styled.div<PaginationProps>`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  gap: 0.5vw;
  img {
    width: 24px;
    height: 24px;
  }
  @media ${device.mobileS} {
    img {
      width: 18px;
      height: 18px;
    }
  }

  @media ${device.mobileM} {
    img {
      width: 20px;
      height: 20px;
    }
  }

  @media ${device.tablet} {
    img {
      width: 22px;
      height: 22px;
    }
  }
  @media ${device.laptop} {
    img {
      width: 24px;
      height: 24px;
    }
  }
  @media ${device.laptopL} {
    img {
      width: 24px;
      height: 24px;
    }
  }
`;
