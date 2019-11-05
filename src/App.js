import React, { useState, useRef } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components'
import { Root } from './components/Root';
import { ProgressBar } from './components/ProgressBar';

const Heading = styled.h1`
  font-size: 72px;
`;

const Body = styled.div`
  width: 900px;
  margin: 300px auto 0;
`

function App() {
  const [AType, setAType] = useState('');
  const [A, setA] = useState(0);
  const [Ch, setCh] = useState(0);
  const [DP, setDP] = useState(0);
  const OP = useRef();
  const B = useRef();
  const Apl = useRef();
  const Ab = useRef();
  const Chr = useRef();
  const Kn = useRef();
  const [distance, setDistance] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const currentProgress = currentPage/distance*100;

  const handleFirstClick = () => {
    if (AType === "current") {
      setCurrentPage(2);
    }
    if (AType === "long") {
      setCurrentPage(2);
      setDistance(3);
    }
    setAType('');
  }

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  }

  const handleAChange = (event) => {
    event.preventDefault();
    setA(parseInt(Chr.current.value) * parseInt(Kn.current.value))
  }

  const handleDPChange = (event) => {
    event.preventDefault();
    if (AType === 'upgrade'){
      if (parseInt(Apl.current.value) < parseInt(Ab.current.value)) {
        return setDP(NaN);
      }
      setDP(parseInt(Apl.current.value) - parseInt(Ab.current.value))
      setA(DP + Ch)
      return;
    }
    if (AType === 'swap'){
      setDP(parseInt(Apl.current.value) * parseInt(Ab.current.value))
      setA(DP + Ch)
      return;
    }
  }

  const handleChChange = (event) => {
    event.preventDefault();
    if ((parseInt(B.current.value) === 0) && (parseInt(OP.current.value) > 0)) {
      return setCh(NaN);
    }
    return setCh(parseInt(OP.current.value) / parseInt(B.current.value))
  }
  
  return (
    <Body>
    <ProgressBar progress={currentProgress} />
      {(currentPage === 1) && 
        (<Root title="Выберите период для рассчёта потребности персонала (A)" onClick={handleFirstClick} disabled={AType === '' ? true : false}>
          <Box>
            <input type="radio" id="choice1"
              name="A" value="current" onChange={e => setAType(e.target.value)} />
            <label htmlFor="choice1">Текущая потребность в специалиста</label>
          </Box>
          <Box>
            <input type="radio" id="choice2"
              name="A" value="long" onChange={e => setAType(e.target.value)}  />
            <label htmlFor="choice2">Долговременная потребность в специалиста</label>
          </Box>
        </Root>) 
      }
        {(currentPage === 2 && distance === 3) && 
          (<Root title="Введите данные для вычисления потребности персонала" onClick={handleNextClick} disabled={isNaN(A) ? true : false}>
            <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
            <label htmlFor="workerCount">Среднесписочна численность рабочих</label>
              <input type="number" id="workerCount"
                name="Chr" min='0' defaultValue="0" onChange={handleAChange} ref={Chr}/>
            </Flex>
            <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
            <label htmlFor="coefficient">Нормативный коэффициент насыщенности специалистами</label>
              <input type="number" id="coefficient"
                name="Kn" min='0' defaultValue="0" onChange={handleAChange} ref={Kn} />
            </Flex>
          </Root>) 
        }
        {(currentPage === 2 && distance === 5) && 
          (<Root title="Введите данные для вычисления базовой потребности в кадрах" onClick={handleNextClick} disabled={isNaN(Ch) ? true : false}>
            <h3>Ч = ОП / В = {Ch.toFixed(2)}</h3>
            <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
            <label htmlFor="volume">Объем производства (ОП)</label>
              <input type="number" id="volume"
                name="OP" min='0' defaultValue="0" onChange={handleChChange} ref={OP}/>
            </Flex>
            <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
            <label htmlFor="singleWorker">Выработка на одного работающего (В)</label>
              <input type="number" id="singleWorker"
                name="B" min='0' defaultValue="0" onChange={handleChChange} ref={B} />
            </Flex>
          </Root>) 
        }
        {(currentPage === 3 && distance === 5) && 
          (<Root title="Для каких целей возникла дополнительная потребность в кадрах" onClick={handleNextClick} disabled={AType === '' ? true : false}>
            <Box>
              <input type="radio" id="choice3"
                name="DP" value="upgrade" onChange={e => setAType(e.target.value)} />
              <label htmlFor="choice3">Происходит развитие предприятия</label>
            </Box>
            <Box>
              <input type="radio" id="choice4"
                name="DP" value="swap" onChange={e => setAType(e.target.value)}  />
              <label htmlFor="choice4">Частичная замена специалистов</label>
            </Box>
          </Root>) 
        }
        {(currentPage === 4 && distance === 5 && AType === 'upgrade') && 
          (<Root title="Введите данные для вычисления дополнительной потребности в кадрах" onClick={handleNextClick} disabled={isNaN(DP) ? true : false}>
            <h3>ДП = Апл - Аб = {DP}</h3>
            <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
            <label htmlFor="common">Общая потребность в специалистах в планируемый период (Апл)</label>
              <input type="number" id="common"
                name="Apl" min='0' defaultValue="0" onChange={handleDPChange} ref={Apl}/>
            </Flex>
            <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
            <label htmlFor="basic">Общая потребность в специалистах в базовый период (Аб)</label>
              <input type="number" id="basic"
                name="Ab" min='0' defaultValue="0" onChange={handleDPChange} ref={Ab} />
            </Flex>
          </Root>) 
        }
          {(currentPage === 4 && distance === 5 && AType === 'swap') && 
            (<Root title="Введите данные для вычисления дополнительной потребности в кадрах" onClick={handleNextClick} disabled={isNaN(DP) ? true : false}>
              <h3>ДП = Апл * Кв = {DP.toFixed()}</h3>
              <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
              <label htmlFor="common">Общая потребность в специалистах в планируемый период (Апл)</label>
                <input type="number" id="common"
                  name="Apl" min='0' defaultValue="0" onChange={handleDPChange} ref={Apl}/>
              </Flex>
              <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
              <label htmlFor="basic">Коэффициент выбытия специалистов (Кв)</label>
                <input type="number" id="basic"
                  name="Ab" min='0' defaultValue="0" onChange={handleDPChange} ref={Ab} />
              </Flex>
            </Root>) 
          }
          {((currentPage === 5 && distance === 5) || (currentPage === 3 && distance === 3)) && 
            (<Root title="Общая потребность предприятия в кадрах составила:" noButton>
                <Box alignSelf="center"><Heading>{A.toFixed()}</Heading></Box>
            </Root>) 
          }
        </Body>
  );
}

export default App;
