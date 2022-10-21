import "./css/index.css";
import IMask from "imask";

const ccBlurColor01 = document.querySelector(".cc-bg svg g g:nth-child(1) path");
const ccBlurColor02 =  document.querySelector(".cc-bg svg >g g:nth-child(2) path"); 
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(cardType){
  const colors = {
    "visa": ["#2D57F2", "#436D99"],
    "mastercard": ["#C69347", "#DF6F29"],
    "american-express": ["#2DCFF2", "#43995B"],
    "default": ["black", "gray"]
  };

  ccBlurColor01.setAttribute("fill", colors[cardType][0]);
  ccBlurColor02.setAttribute("fill", colors[cardType][1]);
  ccLogo.setAttribute("src", `cc-${cardType}.svg`);
  // element.setAttribute(nomeAtributo, valorDesejado);
};

//Chamando a função setCardType() aqui no escopo
// //setCardType("default");

//Disponibilizando a função setCardType() GLOBAL -> pra acessá-la em outras partes da aplicação, direto do console do browser
globalThis.setCardType = setCardType;


/** Security Code Input **/ 
const securityCode = document.querySelector("#security-code");

const securityCodePatternMask = {
  mask: "0000" 
    //padrão da máscara -> 4 dígitos(number)
};

const maskedSecurityCode = IMask(securityCode, securityCodePatternMask);


/** Expiration Date Input **/ 
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


/** Card Number Input **/ 
// DispatchMask -> Máscaras dinâmicas -> qnto mask tem diversos itens 
const cardNumber = document.querySelector("#card-number");

const cardNumberPatternMask = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3[47]\d{0,13}/,
      cardtype: "american-express"
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default"
    },
  ],
  dispatch: function(appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, ""); 
      //só aceita dígitos

    const findCardNumberMask = dynamicMasked.compiledMasks.find(
      (maskItem) => {
      return number.match(maskItem.regex);
    });

    console.log(findCardNumberMask);

    return findCardNumberMask;
  }
};

const maskedCardNumber = IMask(cardNumber, cardNumberPatternMask);

//dynamicMasked -> seleciona automaticamente a máscara apropriada do conjunto de masks fornecido

//Appended -> anexado

//.replace(/\D/g, '') -> substitua Não Digito por vazio -> tudo o que não for digito ex: a b c não são digitos 


/** Recebendo clique do botão **/
const addCardButton = document.querySelector("#add-card-btn");

addCardButton.addEventListener("click", () => {
  alert("Cartão adicionado!");
});

/** Desativando o Reload padrão do submit **/
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});

/** Obtendo e exibindo Nome do Titular **/
const cardHolderInput = document.querySelector("#card-holder");

cardHolderInput.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value");

  ccHolder.innerText = cardHolderInput.value.length === 0 ? 'Fulano da Silva' : cardHolderInput.value;
});

/** Obtendo e exibindo CVC **/
maskedSecurityCode.on("accept", () => {
  updateSecurityCode(maskedSecurityCode.value);
});

function updateSecurityCode(code){
  const ccSecurity = document.querySelector(".cc-security .value");

  ccSecurity.innerText = code.length === 0 ? '123' : code;
};

/** Obtendo e exibindo Número do cartão com cor **/
maskedCardNumber.on("accept", () => {
  const cardType = maskedCardNumber.masked.currentMask.cardtype;

  setCardType(cardType);

  updateCardNumber(maskedCardNumber.value);
});

function updateCardNumber(number){
  const ccNumber = document.querySelector(".cc-number");

  ccNumber.innerText = number.length === 0 ? '1234 5678 9012 3456' : number;
};

/** Obtendo e exibindo Data de Expiração **/
maskedExpirationDate.on("accept", () => {
  setExpirationDate(maskedExpirationDate.value);
});


function setExpirationDate(date){
  const ccExpiration = document.querySelector(".cc-expiration .value");

  ccExpiration.innerText = date.length === 0 ? '02/32' : date;
};

