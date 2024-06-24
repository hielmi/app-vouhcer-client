import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import styles from "./ModalAddProduct.module.scss";
import Modal from "../../../../components/ui/Modal";
import Input from "../../../../components/ui/Input";
import Select from "../../../../components/ui/Select";
import InputFile from "../../../../components/ui/InputFile";
import Button from "../../../../components/ui/Button";
import voucherServices from "../../../../service/voucher";
import { useVoucherContext } from "../../../../hooks/useVoucherContext";
import Swal from "sweetalert2";

type PropTypes = {
  setShowModalAddVoucher: Dispatch<SetStateAction<boolean>>;
};

const ModalAddProduct = (props: PropTypes) => {
  const { setShowModalAddVoucher } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const { saveVoucher } = useVoucherContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama", name);
      formData.append("kategori", category);
      if (uploadedImage) {
        formData.append("foto", uploadedImage);
      }
      const { data } = await voucherServices.addVoucher(formData);

      saveVoucher(data.data[0]);
      setShowModalAddVoucher(false);
    } catch (err: any) {
      const resultFromApi = err.response
        ? err.response.data.message
        : "Something error when adding voucher";
      Swal.fire({
        icon: "error",
        title: "Failed to add vouhcer",
        text: resultFromApi,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setShowModalAddVoucher(false)}>
      <h1>Add Voucher</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert voucher name"
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          label="Category"
          name="category"
          labelKey="label"
          valueKey="value"
          options={[
            { label: "Bukalapak", value: "Bukalapak" },
            { label: "Shopee", value: "Shopee" },
            { label: "Tokopedia", value: "Tokopedia" },
            { label: "Blibli", value: "Blibli" },
          ]}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label htmlFor="image">Change product image</label>
        <div className={styles.form__upload}>
          <InputFile
            name={"image"}
            setUploadedImage={setUploadedImage}
            uploadedImage={uploadedImage}
            className={styles.form__upload__input}
          />
        </div>

        <Button type="submit" isDisabled={isLoading}>
          {isLoading ? "Loading..." : "Add Voucher"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
