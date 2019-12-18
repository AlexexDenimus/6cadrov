import React, { useState } from "react";
import styled from "styled-components";
import { Flex, Box } from "rebass";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import ReactTooltip from "react-tooltip";

const Body = styled.div`
  max-width: 100%;
  min-height: 200px;
  background-color: #d3d3d3;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;

const Button = styled.button`
  width: 64px;
  align-self: flex-end;
  margin-top: 24px;
  cursor: pointer;
`;

const Developer = ({ color, setColor }) => (
  <Box ml="4px">
    <AccountCircleOutlinedIcon
      data-tip
      data-for="developer"
      color={color}
      onMouseEnter={() => setColor("active")}
      onMouseLeave={() => setColor("disabled")}
    />
    <ReactTooltip id="developer" place="bottom" type="light" effect="solid">
      <h3>Разработчик программы</h3>
      <p>Дёмин Алексей Михайлович</p>
    </ReactTooltip>
  </Box>
);

const About = ({ color, setColor }) => (
  <Box ml="16px">
    <HelpOutlineOutlinedIcon
      data-tip
      data-for="about"
      color={color}
      onMouseEnter={() => setColor("active")}
      onMouseLeave={() => setColor("disabled")}
    />
    <ReactTooltip id="about" place="bottom" type="light" effect="solid">
      <h3>Справка</h3>
      <p>Программа разработанна в учебных целях</p>
      <p>Заказчик: НИТУ МИСиС</p>
      <p>В программе всего 7 слайдов</p>
      <p>
        Для смены слайдов, ответьте на вопрос в данном слайде и нажмите кнопку
        далее
      </p>
    </ReactTooltip>
  </Box>
);

const Print = ({ color, setColor }) => (
  <Box>
    <PrintOutlinedIcon
      data-tip
      data-for="print"
      color={color}
      onMouseEnter={() => setColor("active")}
      onMouseLeave={() => setColor("disabled")}
    />
    <ReactTooltip id="print" place="bottom" type="light" effect="solid">
      <span>Печать</span>
    </ReactTooltip>
  </Box>
);

export const Root = props => {
  const [color, setColor] = useState("disabled");
  const [color1, setColor1] = useState("disabled");
  const [color2, setColor2] = useState("disabled");
  return (
    <Body>
      <p>{props.title}</p>
      {props.children}
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Flex flexDirection="row">
          <Developer color={color} setColor={setColor} />
          <About color={color1} setColor={setColor1} />
        </Flex>
        {!props.noButton ? (
          <Button disabled={props.disabled} onClick={props.onClick}>
            Дальше
          </Button>
        ) : (
          <Print color={color2} setColor={setColor2} />
        )}
      </Flex>
    </Body>
  );
};
