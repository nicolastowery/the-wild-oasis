import styled, { css } from "styled-components";
const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

// alternative method to write default props, have to use this method for defining components this way!
Row.defaultProps = {
  type: "vertical",
};

export default Row;
