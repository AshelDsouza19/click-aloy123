import { useState } from "react";
import "../styles/auth.css";

function AuthCard({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Sign Up fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Sign In fields
  const [signinRegNumber, setSigninRegNumber] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  // Forgot Password fields
  const [forgotRegNumber, setForgotRegNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Store registered accounts in memory
  const [accounts, setAccounts] = useState([]);

  const onlyLetters = (text) => /^[A-Za-z]+$/.test(text);

  /* ---------- SIGN UP ---------- */
  const handleSignup = () => {
    setIsSuccess(false);

    if (!firstName.trim()) return setMessage("Please enter first name");
    if (!onlyLetters(firstName)) return setMessage("First name should not contain numbers");
    if (!lastName.trim()) return setMessage("Please enter last name");
    if (!onlyLetters(lastName)) return setMessage("Last name should not contain numbers");

    if (!registerNumber.trim()) return setMessage("Please enter register number");

    // Check if register number already exists
    const alreadyExists = accounts.find(acc => acc.registerNumber === registerNumber.trim());
    if (alreadyExists) return setMessage("This register number is already registered");

    if (!signupEmail.trim()) return setMessage("Please enter email");
    if (!signupEmail.includes("@")) return setMessage("Email must contain @ symbol");
    if (!signupPassword.trim()) return setMessage("Please enter password");
    if (signupPassword.length < 6) return setMessage("Password must be at least 6 characters");

    // Save account
    setAccounts(prev => [...prev, {
      firstName,
      lastName,
      registerNumber: registerNumber.trim(),
      email: signupEmail,
      password: signupPassword
    }]);

    setIsSuccess(true);
    setMessage("Account created successfully! Please sign in.");

    // Clear fields
    setFirstName("");
    setLastName("");
    setRegisterNumber("");
    setSignupEmail("");
    setSignupPassword("");
  };

  /* ---------- SIGN IN ---------- */
  const handleSignin = () => {
    setIsSuccess(false);

    if (!signinRegNumber.trim()) return setMessage("Please enter register number");
    if (!signinPassword.trim()) return setMessage("Please enter password");

    const account = accounts.find(
      acc => acc.registerNumber === signinRegNumber.trim() && acc.password === signinPassword
    );

    if (!account) return setMessage("Invalid register number or password");

    setIsSuccess(true);
    setMessage("Sign in successful!");
    setTimeout(() => {
      onLoginSuccess();
    }, 800);
  };

  /* ---------- FORGOT PASSWORD ---------- */
  const handleForgotPassword = () => {
    setIsSuccess(false);

    if (!forgotRegNumber.trim()) return setMessage("Please enter register number");

    const accountIndex = accounts.findIndex(acc => acc.registerNumber === forgotRegNumber.trim());
    if (accountIndex === -1) return setMessage("No account found with this register number");

    if (!newPassword.trim()) return setMessage("Please enter new password");
    if (newPassword.length < 6) return setMessage("Password must be at least 6 characters");
    if (!confirmPassword.trim()) return setMessage("Please confirm your password");
    if (newPassword !== confirmPassword) return setMessage("Passwords do not match");

    // Update password
    const updatedAccounts = [...accounts];
    updatedAccounts[accountIndex].password = newPassword;
    setAccounts(updatedAccounts);

    setIsSuccess(true);
    setMessage("Password reset successful! Please sign in.");

    setForgotRegNumber("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setShowForgotPassword(false);
      setIsSignup(false);
      setMessage("");
    }, 1500);
  };

  /* ---------- GOOGLE LOGIN (simulated) ---------- */
  const handleGoogleLogin = () => {
    setIsSuccess(true);
    setMessage("Google login coming soon!");
  };

  /* ---------- APPLE LOGIN (simulated) ---------- */
  const handleAppleLogin = () => {
    setIsSuccess(true);
    setMessage("Apple login coming soon!");
  };

  /* ========== FORGOT PASSWORD PAGE ========== */
  if (showForgotPassword) {
    return (
      <div className="auth-wrapper">
        <h1 className="main-title">Click-Aloysius</h1>
        <h2 style={{ textAlign: 'center', fontSize: '18px', marginBottom: '20px', color: '#f8f7f7' }}>
          Reset Password
        </h2>

        {message && (
          <p className={isSuccess ? "msg success" : "msg error"}>{message}</p>
        )}

        <input
          type="text"
          placeholder="Register Number"
          value={forgotRegNumber}
          onChange={(e) => setForgotRegNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="submit-btn" onClick={handleForgotPassword}>
          Reset Password
        </button>

        <p
          onClick={() => { setShowForgotPassword(false); setMessage(""); }}
          style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#aaa', cursor: 'pointer' }}
        >
          ← Back to Sign In
        </p>
      </div>
    );
  }

  /* ========== MAIN AUTH PAGE ========== */
  return (
    <div className="auth-wrapper">
      <h1 className="main-title">Click-Aloysius</h1>

      <div className="toggle-pill">
        <div className={`slider ${isSignup ? "" : "signin"}`}></div>
        <button
          className="pill-btn"
          onClick={() => { setIsSignup(true); setMessage(""); }}
        >
          Sign Up
        </button>
        <button
          className="pill-btn"
          onClick={() => { setIsSignup(false); setMessage(""); }}
        >
          Sign In
        </button>
      </div>

      {message && (
        <p className={isSuccess ? "msg success" : "msg error"}>{message}</p>
      )}

      {/* ---- SIGN UP ---- */}
      {isSignup ? (
        <>
          <div className="name-row">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Register Number"
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />

          <button className="submit-btn" onClick={handleSignup}>
            Create Account
          </button>
        </>
      ) : (
        /* ---- SIGN IN ---- */
        <>
          <input
            type="text"
            placeholder="Register Number"
            value={signinRegNumber}
            onChange={(e) => setSigninRegNumber(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={signinPassword}
            onChange={(e) => setSigninPassword(e.target.value)}
          />

          <button className="submit-btn" onClick={handleSignin}>
            Sign In
          </button>

          {/* Forgot Password link */}
          <p
            onClick={() => { setShowForgotPassword(true); setMessage(""); }}
            style={{ textAlign: 'center', marginTop: '10px', fontSize: '13px', color: '#aaa', cursor: 'pointer' }}
          >
            Forgot Password?
          </p>
        </>
      )}

      {/* Social login buttons */}
      <div className="social-row">
        <button className="social google" onClick={handleGoogleLogin}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />
        </button>
        <button className="social apple" onClick={handleAppleLogin}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            alt="Apple"
            className="apple-icon"
          />
        </button>
      </div>
    </div>
  );
}

export default AuthCard;
