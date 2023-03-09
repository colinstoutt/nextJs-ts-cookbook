import Link from "next/link";
import config from "../config/config";
import Image from "next/image";
import Instruction from "@/types/instruction";
import Ingredient from "@/types/ingredient";

interface Recipes {
  data: {
    name: string;
    imageUrl: string;
    prepTime: number;
    cookTime: number;
    ingredients: Ingredient[];
    instructions: Instruction[];
    _id: number;
  }[];
}

const Index = ({ data }: Recipes) => {
  return (
    <div className="index">
      <h1 className="heading index__heading">My Recipes</h1>
      <div className="line-divide"></div>
      <div className="index__recipes">
        {data.map((recipe) => {
          return (
            <div className="index__recipe-card" key={recipe._id}>
              <h1 className="index__recipe-card-title">{recipe.name}</h1>
              <Image
                src={recipe.imageUrl}
                alt={recipe.name}
                style={{ objectFit: "cover", borderRadius: "10px" }}
                width={400}
                height={200}
                priority
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${config.PROD}`);
  const { data } = await res.json();
  return { props: { data } };
}

export default Index;
