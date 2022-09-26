import { FormProducts } from "../../components/Admin/FormProducts";
import { LayoutProfile } from "../../components/layout";
import { useForm } from "../../hooks";

export const AddProductPage = () => {
  return (
    <LayoutProfile>
      {/* <div className="min-h-[85vh] grid grid-cols-1 md:grid-cols-2"> */}
        <FormProducts />
      {/* </div> */}
    </LayoutProfile>
  );
};
