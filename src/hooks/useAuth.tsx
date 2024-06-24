import useUserContext from "./useUserContext";
const useAuth = () => {
  const context = useUserContext();

  return {
    authenticated: context.authenticated,
    user: context.user,
  };
};

export default useAuth;
