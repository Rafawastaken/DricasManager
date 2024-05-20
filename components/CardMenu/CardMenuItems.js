// Images
import pedrasImage from "../../assets/icons/pedras.png";
import materialImage from "../../assets/icons/materiais.png";
import encomendasImage from "../../assets/icons/encomendas.png";
import artigosImage from "../../assets/icons/artigos.png";

const CardMenuItems = [
  {
    id: 0,
    title: "+ Pedras",
    description: "Adicionar Pedra",
    image: pedrasImage, // Adjusted path
    action: "/pedras/adicionar",
  },
  {
    id: 1,
    title: "+ Material",
    description: "Adicionar Materiais",
    image: materialImage, // Adjusted path
    action: "/materiais/adicionar",
  },
  {
    id: 2,
    title: "+ Artigo",
    description: "Adicionar Artigos",
    image: artigosImage,
    action: "/artigos/adicionar",
  },
  {
    id: 3,
    title: "+ Encomenda",
    description: "Adicionar Encomendas",
    image: encomendasImage,
    action: "/encomendas/adicionar",
  },
];

export default CardMenuItems;
