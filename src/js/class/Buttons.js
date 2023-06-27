export default class Buttons {
  static classes = {
    hidden: "hidden",
  }

  constructor({ selector, name, nameDisable, isHidden = false }) {
    this.button = this.getButton(selector)
    this.name = name;
    this.nameDisable = nameDisable;

    isHidden && this.hide();
    // isHidden = true && this.hide() -> true && true -> this.hide()
    // isHidden = true && this.hide() -> false && true -> false
  }

  getButton(selector) {
    return document.querySelector(selector)
  }

  hide() {
    this.button.classList.add(Buttons.classes.hidden);

  }

  show() {
    this.button.classList.remove(Buttons.classes.hidden);
  }

  disable() {
    this.button.disabled = true;
    this.button.textContent = this.nameDisable;
  }

  enable() {
    this.button.disabled = false;
    this.button.textContent = this.name;
  }



}