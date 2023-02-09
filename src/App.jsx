import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImageCryptos from "./img/imagen-criptos.png";
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 900px;
  gap: 30px;

  @media (max-width: 900px) {
    max-width: 90%;
    flex-direction: column;
    column-gap: 30pxrem;
    margin-bottom: 1px;
  }
`;

const Image = styled.img`
  display: block;
  height: fit-content;
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;

  @media (max-width: 992px) {
    max-width: 250px;
    margin: 10px auto 0 auto;
  }
`;

const Heading = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 34px;
  margin-top: 120px;

  &::after {
    content: "";
    width: 125px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }

  @media (max-width: 992px) {
    font-size: 34px;
    margin-top: -20px;
  }
`;

function App() {
  const [currencies, setCurrencies] = useState({});
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(currencies).length > 0) {
      const quoteCrypto = async () => {
        setLoading(true);
        setResult({});
        const { currency, cryptoCurrency } = currencies;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;
        const response = await fetch(url);
        const result = await response.json();
        setResult(result.DISPLAY[cryptoCurrency][currency]);

        setLoading(false);
      };
      quoteCrypto();
    }
  }, [currencies]);

  return (
    <>
      <Container>
        <Image src={ImageCryptos} alt="image-cryptos" />
        <div>
          <Heading>Cotiza Critomonedas al instante</Heading>
          <Form setCurrencies={setCurrencies} />
          {loading && <Spinner />}
          {result.PRICE && <Result result={result} />}
        </div>
      </Container>
    </>
  );
}

export default App;
