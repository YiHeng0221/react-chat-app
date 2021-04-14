import React from "react";
import styled from "styled-components";
import brand from "../../images/Brand/brand@2x.png";

const BrandWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
`;

const Title = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`;

export default function Brand() {
  return (
    <BrandWrapper>
      <Title src={brand} alt="brand" width="95" height="17" />
    </BrandWrapper>
  );
}
