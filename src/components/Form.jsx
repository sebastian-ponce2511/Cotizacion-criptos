import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { currencies } from "../data/currencies";
import useSelectCurrency from "../hooks/useSelectCurrency";
import Error from "./Error";

const InputSubmit = styled.input`
  margin-top: 30px;
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;

  &:hover {
    background-color: #7a7dfe;
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }
`;

const Form = ({ setCurrencies }) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  const [currency, SelectCurrency] = useSelectCurrency(
    "Selecciona tu moneda",
    currencies
  );
  const [cryptoCurrency, SelectCryptoCurrency] = useSelectCurrency(
    "Selecciona tu criptomoneda",
    cryptos
  );

  useEffect(() => {
    const callAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=40&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();

      const cryptosArray = result.Data.map((crypto) => {
        const objectCryptos = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };
        return objectCryptos;
      });
      setCryptos(cryptosArray);
    };
    callAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([currency, cryptoCurrency].includes("")) {
      setError(true);
    } else {
      setError(false);
      setCurrencies({ currency, cryptoCurrency });
    }
  };

  return (
    <>
      {error && (
        <Error>
          <p>Ambos campos son obligatorios</p>
        </Error>
      )}
      <form onSubmit={handleSubmit}>
        <SelectCurrency />
        <SelectCryptoCurrency />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Form;
