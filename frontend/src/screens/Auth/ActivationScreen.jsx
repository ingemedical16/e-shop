import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/api/usersApiSlice";
import Loader from "../../components/Loader/Loader";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const ActivationScreen = () => {
  const { activation_token } = useParams();
  let activationToken = activation_token.replace("_p_", ".");
  activationToken = activationToken.replace("_p_", ".");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading, isError }] = useRegisterMutation();

  const { user } = useSelector((state) => state.user);
  let Comp;
  useEffect(() => {
    if (user) {
      navigate("/");
    } else if (activationToken) {
      const sendRequest = async (token) => {
        try {
          const res = await register({ activation_token: token }).unwrap();
          console.log(res);
          toast.success("Your account has been created suceessfully!");
          dispatch(setCredentials({ ...res }));
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
      sendRequest(activationToken);
    }
  }, [navigate, user, activationToken]);

  if (isLoading) {
    Comp = <Loader />;
  }

  if (isError) {
    Comp = <p>Your token is expired!</p>;
  }

  Comp = <p>Your account has been created suceessfully!</p>;

  return (
    <div className=" py-5">
      <div className="flex justify-center align-middle">{Comp}</div>
    </div>
  );
};

export default ActivationScreen;
