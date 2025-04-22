import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import backpacks from "../images/backpacks.jpg";

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-lg"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <div className="row g-0">
          <div className="col-md-5 d-flex align-items-center justify-content-center p-3">
            <img
              src={backpacks}
              className="card-img-top"
              alt="Backpacks"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
            />
          </div>

          <div className="col-md-7 d-flex align-items-center">
            <div className="card-body w-100">
              <h2 className="card-title mb-4 text-center">
                {showLogin ? "Login" : "Sign Up"}
              </h2>
              <h2 className="card-title mb-4 text-center rugged-title">
                Shakedown
              </h2>
              {showLogin ? <LoginForm /> : <SignUpForm />}
            </div>
          </div>
        </div>
      </div>

      <div
        className="text-center px-4 py-3 mt-2 shadow-sm bg-white border rounded"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <p className="mb-2">
          {showLogin ? "Don't have a username?" : "Already have a username?"}
        </p>
        <button
          className="btn btn-secondary"
          onClick={() => setShowLogin(!showLogin)}
        >
          {showLogin ? "Sign up!" : "Login"}
        </button>
      </div>
    </div>
  );
}
