import Sidebar from "../../components/fragments/Sidebar";
import Button from "../../components/ui/Button";
import { useVoucherContext } from "../../hooks/useVoucherContext";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { Voucher } from "../../type/Voucher.type";
import Navbar from "../../components/fragments/Navbar";
import authServices from "../../service/auth";
import profileServices from "../../service/profile";
import useUserContext from "../../hooks/useUserContext";
import voucherServices from "../../service/voucher";
import Swal from "sweetalert2";

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { vouchers, setVouchers } = useVoucherContext();
  const { setUser, setAuthenticated } = useUserContext();

  useEffect(() => {
    const getProfile = async () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const { data } = await authServices.refreshToken({
            refreshToken: refreshToken,
          });

          if (data.status) {
            localStorage.setItem("accessToken", data.accessToken);
            const result = await profileServices.getProfile();
            setUser(result.data.data);
            setAuthenticated(true);
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (error) {
          return;
        }
      }
    };
    getProfile();
  }, [setAuthenticated, setUser]);

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleClaimVoucher = async (id: number) => {
    try {
      const { data } = await voucherServices.claimVoucher({ id: id });
      if (data.status) {
        const { data } = await voucherServices.getAllVouchers();
        if (data.status) {
          setVouchers(data.data);
        } else {
          throw new Error("Failed to fetch vouchers");
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Voucher claimed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err: any) {
      const resultFromApi = err.response
        ? err.response.data.message
        : "Something error when claim voucher";
      Swal.fire({
        icon: "error",
        title: "Failed to claim vouhcer",
        text: resultFromApi,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.home}>
        <Sidebar />
        <div className={styles.home__content}>
          <h1>Vouchers</h1>
          <div className={styles.home__content__vouchers}>
            {vouchers &&
              vouchers.map((voucher: Voucher, index) => (
                <div className={styles.card} key={index}>
                  <div className={styles.card__image}>
                    <img
                      src={`http://8.215.34.100:4000/images/${voucher.foto}`}
                      alt={`foto-${voucher.nama}`}
                      height={500}
                      width={500}
                    />
                    <div className={styles.card__image__text}>
                      <p>{voucher.nama}</p>
                    </div>
                  </div>
                  <div className={styles.card__desc}>
                    <div className={styles.card__desc__text}>
                      <h4>{voucher.nama}</h4>
                      <h4>{voucher.kategori}</h4>
                    </div>
                    <div className={styles.card__desc__action}>
                      <Button
                        type="button"
                        onClick={() => handleClaimVoucher(voucher.id)}
                        isDisabled={voucher.status}
                      >
                        Claim
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

            {vouchers.length <= 0 && (
              <>
                <p>No Voucher available</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.toggleDarkMode}>
        <Button
          type="button"
          variant="secondary"
          className={styles.toggleDarkMode__btnDarkMode}
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <i className="bx bxs-moon"></i>
          ) : (
            <i className="bx bx-moon"></i>
          )}
        </Button>
      </div>
    </>
  );
};

export default HomePage;
