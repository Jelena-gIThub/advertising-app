import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import OAuth from "../components/OAuth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //dobivamo vrijednost auth
      const auth = getAuth();
      //registriramo korisnika sa funkcijom createUserWithEmailAndPassword
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //dobivamo informacije o korisniku za bazu
      const user = userCredential.user;
      //updejtamo ime
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData }; //kopiramo sve sto je u form data state
      delete formDataCopy.password; //brisemo lozinku
      formDataCopy.timestamp = serverTimestamp(); //postavljamo vrijeme na vrijeme servera
      //setDoc ce updejtati nasu bazu i dodati korisnika u kolekciju
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      //redirektamo na naslovnicu
      navigate("/");
    } catch (error) {
      toast.error("Došlo je do pogreške s registracijom!");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Dobrodošli!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="nameInput"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              plaseholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">
            Zaboravljena lozinka?
          </Link>
          <div className="signUpBar">
            <p className="signUpText">Registriraj se</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>

          <Link to="/sign-in" className="registerLink">
            Imaš korisnički račun? Prijavi se
          </Link>
        </form>

        <OAuth />
      </div>
    </>
  );
}

export default SignUp;
