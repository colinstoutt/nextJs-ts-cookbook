import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import config from "@/config/config";
import { GetServerSideProps } from "next";
// import { Formik, Form } from "formik";
// import IngredientInputs from "@/components/IngredientInputs";
// import InstructionInputs from "@/components/InstructionInputs";

interface Props {
  data: {
    _id: string;
    name: string;
    imageUrl: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    ingredients: string;
    instructions: string;
    calPerServing: number;
  };
}
type QueryParams = {
  id: string;
};

const EditRecipe = ({ data }: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: data.name,
    imageUrl: data.imageUrl,
    prepTime: data.prepTime,
    cookTime: data.cookTime,
    servings: data.servings,
    ingredients: data.ingredients,
    instructions: data.instructions,
    calPerServing: data.calPerServing,
  });

  useEffect(() => {
    if (isSubmitting) {
      updateRecipe();
    }
  }, [isSubmitting]);

  const updateRecipe = async () => {
    const recipeId = router.query.id;

    try {
      await fetch(`http://localhost:3000/api/recipes/${recipeId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(form);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //   const handleChangeTextarea = (
  //     e: React.ChangeEvent<HTMLTextAreaElement>
  //   ): void => {
  //     setForm((prev) => ({
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     }));
  //   };

  return (
    <div className="add-recipe">
      <div>
        <h1 className="heading">Edit Recipe</h1>
        <div className="line-divide"></div>
        {isSubmitting ? (
          <h1>Loading...</h1>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>What are you making?</label>
            <input
              className="add-recipe__input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <br />
            <label>Image (url)</label>
            <br />
            <input
              className="add-recipe__input"
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />
            <br />
            <label>
              Prep Time <span>(min)</span>
            </label>
            <br />
            <input
              className="add-recipe__input"
              type="number"
              name="prepTime"
              value={form.prepTime}
              onChange={handleChange}
              required
            />
            <br />
            <label>
              Cook Time<span>(min)</span>
            </label>
            <br />
            <input
              className="add-recipe__input"
              type="number"
              name="cookTime"
              value={form.cookTime}
              onChange={handleChange}
              required
            />
            <br />
            <label>Servings</label>
            <br />
            <input
              className="add-recipe__input"
              type="number"
              name="servings"
              value={form.servings}
              onChange={handleChange}
              required
            />
            <br />
            <label>Ingredients</label>
            <br />
            <input
              className="add-recipe__input"
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              required
            />
            <br />
            <label>Instructions</label>
            <br />
            <input
              className="add-recipe__input"
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

// export async function getServerSideProps({ query: { id } }: queryId) {
//   const res = await fetch(
//     `https://next-js-ts-cookbook.vercel.app/api/recipes/${id}`
//   );
//   const { data } = await res.json();
//   return { props: { data } };
// }
// export const getServerSideProps: GetServerSideProps = async ({
//   query: { id },
// }: queryId) => {
//   try {
//     const res = await fetch(
//       "https://next-js-ts-cookbook.vercel.app/api/recipes/"
//     );
//     const { data } = await res.json();
//     return { props: { data } };
//   } catch (error) {
//     console.log(error);
//     return { props: { data: null } };
//   }
// };

export const getServerSideProps: GetServerSideProps<
  Props,
  QueryParams
> = async ({ query }) => {
  const { id } = query;
  try {
    const res = await fetch(
      `https://next-js-ts-cookbook.vercel.app/api/recipes/${id}`
    );
    const { data } = await res.json();
    return { props: { data } };
  } catch (error) {
    console.log(error);
    return { props: { data: null } };
  }
};

export default EditRecipe;
