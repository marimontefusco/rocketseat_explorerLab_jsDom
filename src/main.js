import "./css/index.css";
import IMask from "imask";

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

  //element.setAttribute(nomeAtributo, valorDesejado);

};

//Chamando a função setCardType() aqui no escopo
// //setCardType("default");

//Disponibilizando a função setCardType() GLOBAL -> pra acessá-la em outras partes da aplicação, direto do console do browser
globalThis.setCardType = setCardType;


/** Security Code **/ 
const securityCode = document.querySelector("#security-code");

  //Padrão da máscara -> 4 dígitos(number)
const securityCodePatternMask = {
  mask: "0000"
};

const maskedSecurityCode = IMask(securityCode, securityCodePatternMask);

/** Expiration date **/ 
const expirationDate = document.querySelector("#expiration-date");

const expirationDatePatternMask = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  }
};

const maskedExpirationDate = IMask(expirationDate, expirationDatePatternMask);