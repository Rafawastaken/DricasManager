import completedIcon from "../../assets/icons/completed.png";
import waitingIcon from "../../assets/icons/wait.png";
import workingIcon from "../../assets/icons/working.png";

const estadosEncomendas = [
  {
    id: 0,
    nome: "Aguardar Pagamento",
    image: waitingIcon,
  },
  {
    id: 1,
    nome: "Em Preparação",
    image: workingIcon,
  },
  {
    id: 2,
    nome: "Enviado",
    image: completedIcon,
  },
];

export default estadosEncomendas;
