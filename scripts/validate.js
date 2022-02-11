const formsValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  inputErrorClass: "popup__field_type_error",
  errorClass: "error_type_visible",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
};

// Функция валидации
function enableValidation(data) {
  const forms = [...document.querySelectorAll(data.formSelector)];

  forms.forEach((form) => addFormListeners(form, data));
}

function addFormListeners(form, config) {
  form.addEventListener("submit", handleSubmit);

  form.addEventListener("input", () => toggleButtonState(form, config));

  const inputs = [...form.querySelectorAll(config.inputSelector)];

  inputs.forEach((input) =>
    input.addEventListener("input", () => handleField(form, input, config))
  );

  toggleButtonState(form, config);
}

// Функция, которая проверяет валидность поля
function handleField(form, input, config) {
  if (input.validity.valid) {
    hideError(form, input, config);
  } else {
    showError(form, input, config);
  }
}

// Функции Error
function showError(form, input, config) {
  input.classList.add(config.inputErrorClass);
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = input.validationMessage;
}

function hideError(form, input, config) {
  input.classList.remove(config.inputErrorClass);
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = " ";
}

//Дефолт
function handleSubmit(event) {
  event.preventDefault();
}

// Кнопка вкл/выкл
function toggleButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

enableValidation(formsValidation);
