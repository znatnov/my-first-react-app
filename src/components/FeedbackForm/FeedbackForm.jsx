import { useState } from "react";
import "./FeedbackForm.css";

export default function FeedbackForm() {
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [wantsResponse, setWantsResponse] = useState(true);
  const [message, setMessage] = useState("");

  
  const [errors, setErrors] = useState({
    name: null,
    phone: null,
    email: null,
    message: null,
  });

  
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  
  const validateName = (val) => {
    if (!val.trim()) return "Имя обязательно для заполнения";
    if (val.trim().length < 2) return "Минимум 2 символа";
    if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(val.trim()))
      return "Только буквы, пробелы и дефис";
    return null;
  };

  
  const validatePhone = (val) => {
    if (!val.trim()) return "Телефон обязателен";
    if (val.replace(/\D/g, "").length !== 11)
      return "Введите полный номер телефона";
    return null;
  };

  
  const validateEmail = (val, requireEmail = wantsResponse) => {
    if (!requireEmail && !val.trim()) return null;
    if (requireEmail && !val.trim()) return "Email обязателен для заполнения";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()))
      return "Некорректный формат email";
    return null;
  };

  
  const validateMessage = (val) => {
    if (!val.trim()) return "Сообщение обязательно для заполнения";
    if (val.trim().length < 10) return "Минимум 10 символов";
    if (val.length > 500) return "Максимум 500 символов";
    return null;
  };

  
  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    
    let formatted = "+7";
    if (digits.length > 1) formatted += " (" + digits.substring(1, 4);
    if (digits.length >= 5) formatted += ") " + digits.substring(4, 7);
    if (digits.length >= 8) formatted += "-" + digits.substring(7, 9);
    if (digits.length >= 10) formatted += "-" + digits.substring(9, 11);
    
    return formatted;
  };

  const handleChange = (field, value) => {
    if (field === "name") setName(value);
    if (field === "phone") setPhone(formatPhoneNumber(value));
    if (field === "email") setEmail(value);
    if (field === "message") setMessage(value.slice(0, 500)); 

    if (touched[field]) {
      let err = null;
      if (field === "name") err = validateName(value);
      if (field === "phone") err = validatePhone(value);
      if (field === "email") err = validateEmail(value, wantsResponse);
      if (field === "message") err = validateMessage(value);

      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setWantsResponse(checked);
    if (touched.email) {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(email, checked),
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let err = null;
    if (field === "name") err = validateName(name);
    if (field === "phone") err = validatePhone(phone);
    if (field === "email") err = validateEmail(email, wantsResponse);
    if (field === "message") err = validateMessage(message);

    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateName(name),
      phone: validatePhone(phone),
      email: validateEmail(email, wantsResponse),
      message: validateMessage(message),
    };

    setErrors(newErrors);
    setTouched({ name: true, phone: true, email: true, message: true });

    if (Object.values(newErrors).some((err) => err !== null)) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const getInputClass = (field) => {
    const classes = ["field__input"];
    if (touched[field] && errors[field]) {
      classes.push("field__input--error");
    } else if (touched[field] && !errors[field]) {
      classes.push("field__input--valid");
    }
    if (field === "message") {
      classes.push("field__input--textarea");
    }
    return classes.join(" ");
  };

  if (submitted) {
    return (
      <div className="feedback-form feedback-form--success">
        <h2 className="feedback-form__title">Спасибо за обращение!</h2>
        <p className="feedback-form__text">
          Мы свяжемся с вами в ближайшее время.
        </p>
        <button
          type="button"
          className="feedback-form__submit"
          onClick={() => {
            setName("");
            setPhone("");
            setEmail("");
            setMessage("");
            setWantsResponse(true);
            setErrors({ name: null, phone: null, email: null, message: null });
            setTouched({ name: false, phone: false, email: false, message: false });
            setSubmitted(false);
          }}
        >
          Отправить ещё одно сообщение
        </button>
      </div>
    );
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      {/* Поле Имя */}
      <div className="field">
        <label htmlFor="name" className="field__label">Имя</label>
        <input
          id="name"
          type="text"
          className={getInputClass("name")}
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
        />
        {touched.name && errors.name && (
          <span className="field__error">{errors.name}</span>
        )}
      </div>

      {/* Поле Телефон (Задание 2) */}
      <div className="field">
        <label htmlFor="phone" className="field__label">Телефон</label>
        <input
          id="phone"
          type="text"
          placeholder="+7 (___) ___-__-__"
          className={getInputClass("phone")}
          value={phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
        />
        {touched.phone && errors.phone && (
          <span className="field__error">{errors.phone}</span>
        )}
      </div>

      {/* Чекбокс ответа (Задание 3) */}
      <div className="field">
        <label className="field__checkbox-label">
          <input
            type="checkbox"
            checked={wantsResponse}
            onChange={handleCheckboxChange}
          />
          Хочу получить ответ
        </label>
      </div>

      {/* Поле Email */}
      <div className="field">
        <label htmlFor="email" className="field__label">
          Email {wantsResponse && <span style={{ color: '#e5484d' }}>*</span>}
        </label>
        <input
          id="email"
          type="email"
          className={getInputClass("email")}
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
        />
        {touched.email && errors.email && (
          <span className="field__error">{errors.email}</span>
        )}
      </div>

      {/* Поле Сообщение c счетчиком (Задание 1) */}
      <div className="field">
        <label htmlFor="message" className="field__label">Сообщение</label>
        <textarea
          id="message"
          className={getInputClass("message")}
          value={message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          rows={5}
          maxLength={500}
        />
        <div className="field__counter">{message.length} / 500</div>
        {touched.message && errors.message && (
          <span className="field__error">{errors.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="feedback-form__submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Отправка…" : "Отправить"}
      </button>
    </form>
  );
}