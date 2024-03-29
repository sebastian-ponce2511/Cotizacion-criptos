import styled from "@emotion/styled";

const Text = styled.div`
  background-color: #b7322c;
  color: #fff;
  padding: 2px;
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
`;

const Error = ({ children }) => {
  return <Text>{children}</Text>;
};

export default Error;
