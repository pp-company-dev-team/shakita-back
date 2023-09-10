import styled from "styled-components";

export const AlertCustom = styled.div<{type: "Error" | "Success"}>`
  position: fixed;
  top: 1em;
  right: 1em;
  padding: 1rem 1rem;
  border: 1px solid white;
  border-radius: 0.25rem;
  color: white;
  background: ${(props) => {
    switch (props.type) {
      case "Error":
        return "#E83939";
      case "Success":
        return "green";
    }
  }};
`;
