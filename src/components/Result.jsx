import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const Text = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`;

const Price = styled.p`
  font-size: 20px;
  span {
    font-weight: 700;
  }
`;

const Image = styled.img`
  display: block;
  width: 180px;

  @media (max-width: 992px) {
    margin-top: 5px;
    margin-bottom: -20px;
  }
`;

const Result = ({ result }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    result;
  return (
    <Container>
      <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="image-cripto" />
      <div>
        <Price>
          EL precio es de: <span>{PRICE}</span>
        </Price>
        <Text>
          Precio más alto del día: <span>{HIGHDAY}</span>
        </Text>
        <Text>
          Precio más bajo del día: <span>{LOWDAY}</span>
        </Text>
        <Text>
          Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
        </Text>
        <Text>
          Última Actualización: <span>{LASTUPDATE}</span>
        </Text>
      </div>
    </Container>
  );
};

export default Result;
