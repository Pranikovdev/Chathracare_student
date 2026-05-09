import React from "react";
import Navbar from "../../components/layout/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import indiaMap from "@svg-maps/india";


/* ─── India SVG Map ────────────────────────────────────────────────────────── */
const IndiaMap = () => (
  <svg
    viewBox={indiaMap.viewBox}
    fill="#5BA4CF"
    stroke="#4A8CB5"
    strokeWidth="1.5"
    className="w-full max-w-md mx-auto drop-shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
  >
    {indiaMap.locations.map((location) => (
      <path
        key={location.id}
        d={location.path}
        id={location.id}
        name={location.name}
        className="hover:fill-[#7BBDE0] hover:stroke-white transition-colors duration-300 cursor-pointer"
      />
    ))}
  </svg>
);

/* ─── Input component ──────────────────────────────────────────────────────── */
const Field = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 text-sm outline-none
      focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition placeholder:text-slate-400 ${className}`}
  />
);

/* ─── Main Component ───────────────────────────────────────────────────────── */
export default function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [notRobot, setNotRobot] = React.useState(false);
  const [robotError, setRobotError] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");

  const recaptchaRef = React.useRef(null);
  const formRef = React.useRef(null);

  const validatePhone = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    setPhoneError(digits.length > 0 && digits.length < 10 ? "Enter a valid 10-digit number" : "");
    setPhone(digits);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notRobot) { setRobotError(true); return; }
    if (phone.length !== 10) { setPhoneError("Enter a valid 10-digit number"); return; }

    setIsSubmitting(true);

    try {
      // Create a native HTML form element programmatically
      const formElement = document.createElement('form');
      formElement.action = "https://api.web3forms.com/submit";
      formElement.method = "POST";

      // We set target to a hidden iframe so the entire React app doesn't reload and navigate away
      formElement.target = "hidden_iframe";

      // Transfer data from React ref cleanly
      const formData = new FormData(e.target);
      formData.delete('g-recaptcha-response');
      formData.append("access_key", "ef99df71-f012-40ed-9775-523d59f43e1d");
      formData.append("subject", "New Contact Form Submission from ChathraCare");
      formData.append("from_name", "ChathraCare Platform");

      // Inject inputs into the native form
      for (let [key, value] of formData.entries()) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        formElement.appendChild(input);
      }

      // Add it to DOM, submit it instantly natively, and instantly remove it
      document.body.appendChild(formElement);
      formElement.submit();
      document.body.removeChild(formElement);

      // Since we post to an iframe, we trust the native browser push succeeds unconditionally 
      // without failing due to CORS / ERR_CONNECTION_RESET blocks.
      setTimeout(() => {
        setSubmitted(true);
        e.target.reset();
        setPhone(""); setNotRobot(false); setRobotError(false);
        if (recaptchaRef.current) recaptchaRef.current.reset();
        setIsSubmitting(false);
      }, 800);

    } catch (err) {
      console.error("Network error submitting form:", err);
      alert(`Error submitting. If you are on a restricted network, it may be blocking the request.`);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-blue-50 min-h-screen py-20 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="rounded-3xl border border-blue-100/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(239,246,255,0.9))] p-6 md:p-8 shadow-[0_20px_46px_rgba(30,64,175,0.12)]">
            <span className="inline-flex bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full">
              Contact Us
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mt-4 leading-tight">
              Let&apos;s Connect with ChathraCare Team
            </h1>
            <p className="text-slate-600 mt-4 max-w-3xl text-base leading-relaxed">
              Reach Chathracare for onboarding, training, technical support, or
              implementation guidance. Our team is ready to help your school
              run student health operations smoothly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_10px_26px_rgba(30,64,175,0.10)]">
              <div className="text-xs uppercase tracking-[0.12em] text-blue-500 font-semibold">Phone</div>
              <div className="text-blue-900 text-xl font-bold mt-2">+91 81235 68751</div>
              <p className="text-slate-600 text-sm mt-2">For urgent support and onboarding calls.</p>
            </article>
            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_10px_26px_rgba(30,64,175,0.10)]">
              <div className="text-xs uppercase tracking-[0.12em] text-blue-500 font-semibold">Email</div>
              <div className="text-blue-900 text-xl font-bold mt-2">support@tarqen.com</div>
              <p className="text-slate-600 text-sm mt-2">For technical queries and product guidance.</p>
            </article>
            <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_10px_26px_rgba(30,64,175,0.10)] sm:col-span-2 lg:col-span-1">
              <div className="text-xs uppercase tracking-[0.12em] text-blue-500 font-semibold">Office</div>
              <div className="text-blue-900 text-xl font-bold mt-2">Hindupur, Andhra Pradesh</div>
              <p className="text-slate-600 text-sm mt-2">Mon - Fri, 8AM - 6PM</p>
            </article>
          </div>

          <div className="mt-8">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 md:p-7 shadow-[0_14px_32px_rgba(30,64,175,0.12)]">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900">Send a Message</h2>
                <p className="text-slate-600 mt-2">Share your requirement and we&apos;ll reach out shortly.</p>
              </div>

              {/* ── Two-column layout ── */}
              <div className="grid lg:grid-cols-2 gap-12 items-start">

                {/* ── LEFT: Form ── */}
                <div className="order-2 lg:order-1">
                  {submitted ? (
                    <div className="bg-blue-50 border border-blue-100 p-10 rounded-2xl text-center shadow-sm">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500 text-white rounded-full mb-4 shadow-lg shadow-blue-500/30">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                      <p className="text-slate-500 mt-2 text-sm">
                        Our team will get back to you at support@tarqen.com shortly.
                      </p>
                      <button onClick={() => setSubmitted(false)}
                        className="mt-5 text-blue-600 font-semibold hover:text-blue-700 underline text-sm transition-colors">
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

                      {/* Row 1: Name | Phone | Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Field name="name" placeholder="Full name *" required />

                        {/* Phone with +91 */}
                        <div>
                          <div className={`flex rounded-xl border overflow-hidden transition bg-slate-50
                            ${phoneError ? "border-red-400" : "border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"}`}>
                            <span className="flex items-center px-3 text-slate-500 text-xs font-semibold bg-slate-100 border-r border-slate-200 select-none whitespace-nowrap">
                              🇮🇳 +91
                            </span>
                            <input
                              type="tel"
                              placeholder="Phone number *"
                              required
                              value={phone}
                              onChange={(e) => validatePhone(e.target.value)}
                              inputMode="numeric"
                              className="flex-1 px-3 py-3 text-slate-800 text-sm outline-none bg-transparent placeholder:text-slate-400 min-w-0"
                            />
                          </div>
                          {phoneError && <p className="text-red-500 text-xs mt-1 pl-1">{phoneError}</p>}
                        </div>

                        <Field name="email" type="email" placeholder="Email address *" required />
                      </div>

                      {/* Row 2: Location | School */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field name="location" placeholder="Location *" required />
                        <Field name="school" placeholder="School / Organization *" required />
                      </div>

                      {/* Row 3: Designation */}
                      <div className="grid grid-cols-1 gap-3">
                        <Field name="designation" placeholder="Designation" />
                      </div>

                      {/* Row 4: Message */}
                      <textarea
                        name="message"
                        rows="5"
                        placeholder="Message"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 text-sm
                          outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition
                          placeholder:text-slate-400 resize-none"
                      />

                      {/* Row 5: CAPTCHA checkbox */}
                      <div>
                        <div className="transform origin-left scale-90 sm:scale-100">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={(val) => {
                              setNotRobot(!!val);
                              if (val) setRobotError(false);
                            }}
                          />
                        </div>
                        {robotError && (
                          <p className="text-red-500 text-xs mt-1 pl-1 font-medium">Please confirm you&apos;re not a robot.</p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-yellow-400 hover:bg-yellow-300 transition-all text-slate-900 font-bold px-10 py-3
                          rounded-full shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm w-full sm:w-auto
                          ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </button>

                    </form>
                  )}
                </div>

                {/* ── RIGHT/TOP: India Map ── */}
                <div className="flex flex-col items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0 lg:-translate-y-4">
                  <div className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[450px]">
                    <IndiaMap />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
