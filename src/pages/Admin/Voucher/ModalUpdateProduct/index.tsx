import Modal from "../../../../components/ui/Modal";
import Input from "../../../../components/ui/Input";
import styles from "./ModalUpdateProduct.module.scss";
import Select from "../../../../components/ui/Select";
import Button from "../../../../components/ui/Button";
import InputFile from "../../../../components/ui/InputFile";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Voucher } from "../../../../type/Voucher.type";
import voucherServices from "../../../../service/voucher";
import Swal from "sweetalert2";
import { useVoucherContext } from "../../../../hooks/useVoucherContext";

type PropTypes = {
  voucher: Voucher | null;
  setEditVoucher: Dispatch<SetStateAction<Voucher | null>>;
};

const ModalUpdateProduct = (props: PropTypes) => {
  const { voucher, setEditVoucher } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const { setVouchers } = useVoucherContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form: any = e.target as HTMLFormElement;

      const updatedFields: any = {};

      if (form.nama.value !== "" && form.nama.value !== voucher?.nama) {
        updatedFields.nama = form.nama.value;
      }
      if (
        form.kategori.value !== "" &&
        form.kategori.value !== voucher?.kategori
      ) {
        updatedFields.kategori = form.kategori.value;
      }
      if (uploadedImage) {
        updatedFields.foto = uploadedImage;
      }

      const formData = new FormData();
      for (const key in updatedFields) {
        formData.append(key, updatedFields[key]);
      }

      const { data } = await voucherServices.updateVoucherById(
        String(voucher?.id),
        formData
      );

      if (data.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Voucher updated successfully",
        });
        setVouchers((prevVouchers) =>
          prevVouchers.map((v) =>
            v.id === voucher?.id ? { ...v, ...data.data[0] } : v
          )
        );
        setEditVoucher(null);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      onClose={() => {
        setEditVoucher(null);
      }}
    >
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nama"
          name="nama"
          type="text"
          placeholder="Insert product name"
          defaultValue={voucher?.nama}
        />
        <Select
          label="Kategori"
          name="kategori"
          labelKey="label"
          valueKey="value"
          options={[
            { label: "Bukalapak", value: "Bukalapak" },
            { label: "Shopee", value: "Shopee" },
            { label: "Tokopedia", value: "Tokopedia" },
            { label: "Blibli", value: "Blibli" },
          ]}
          defaultValue={voucher?.kategori}
        />

        <label htmlFor="image">Change product image</label>
        <div className={styles.form__upload}>
          <img
            src={`http://8.215.34.100:4000/images/${voucher?.foto}`}
            width={100}
            height={100}
            alt="product-image"
            className={styles.form__upload__image}
          />
          <InputFile
            name={"foto"}
            setUploadedImage={setUploadedImage}
            uploadedImage={uploadedImage}
            className={styles.form__upload__input}
          />
        </div>

        <Button type="submit" isDisabled={isLoading}>
          {isLoading ? "Loading..." : "Change Voucher"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
