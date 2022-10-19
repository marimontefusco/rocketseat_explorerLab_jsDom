import "./css/index.css";

const ccBlurColor01 = document.querySelector(".cc-bg svg g g:nth-child(1) path");
const ccBlurColor02 =  document.querySelector(".cc-bg svg >g g:nth-child(2) path"); 
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(cardType){
  
  const colors = {
    "visa": ["#2D57F2", "#436D99"],
    "mastercard": ["#C69347", "#DF6F29"],
    "elo": ["#2DCFF2", "#43995B"],
    "default": ["black", "gray"]
  };

  ccBlurColor01.setAttribute("fill", colors[cardType][0]);
  ccBlurColor02.setAttribute("fill", colors[cardType][1]);
  ccLogo.setAttribute("src", `cc-${cardType}.svg`);
};

//Chamando a função setCardType() aqui no escopo
// //setCardType("default");

//Disponibilizando a função setCardType() GLOBAL -> pra acessá-la em outras partes da aplicação, direto do console do browser
globalThis.setCardType = setCardType;


//element.setAttribute(nomeAtributo, valorDesejado);
