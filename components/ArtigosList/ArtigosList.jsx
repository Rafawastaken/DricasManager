import { useRouter } from "expo-router";
import { View } from "react-native";
import { SIZES } from "../../constants/theme";
import DefaultListCard from "../DefaultListCard/DefaultListCard";
import artigos from "./ArtigosListExample";

const ArtigosList = () => {
  const navigation = useRouter();

  const calculatePrecoCusto = (artigo) => {
    const custo_pedras = artigo.pedras.reduce(
      (acc, pedra) => acc + pedra.preco * pedra.quantidade_usada,
      0
    );
    const custo_material = artigo.material.reduce(
      (acc, material) =>
        acc +
        (material.preco / material.quantidade_encomendada) *
          material.quantidade_usada,
      0
    );
    const preco_custo = custo_pedras + custo_material;
    return preco_custo.toFixed(2);
  };

  return (
    <View style={{ marginTop: SIZES.medium, gap: SIZES.small }}>
      {artigos.map((artigo) => (
        <DefaultListCard
          item={{ ...artigo, preco_custo: calculatePrecoCusto(artigo) }}
          key={artigo.id}
          handleNavigate={() => {
            navigation.push(`/artigo/${artigo.id}`);
          }}
          handleDelete={() => {
            navigation.push(`/artigo/apagar/${artigo.id}`);
          }}
        />
      ))}
    </View>
  );
};

export default ArtigosList;
