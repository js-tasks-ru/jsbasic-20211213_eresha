import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.btnClose = this.elem.querySelector('.modal__close');
  }

  render() {
    this.elem = createElement(this._createModalMarkup());
  }

  _createModalMarkup() {
    return `<div class="container">
      <div class="modal">

      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>

        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>
  </div>`;
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.textContent = '';
    modalBody.append(node);
  }

  open() {
    document.body.appendChild(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener(`keydown`, this._onPressEsc);
    this.btnClose.addEventListener('click', this._onClickCloseBtn);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener(`keydown`, this._onPressEsc);
    this.btnClose.removeEventListener('click', this._onClickCloseBtn); //нужно удалять этот обработчик или он просто удаляется с элементом?
  }

  _onClickCloseBtn = (evt) => {
    evt.preventDefault();
    this.close();
  }

  _onPressEsc = (evt) => {
    if (evt.code === 'Escape') {
      evt.preventDefault();
      this.close();
    }
  }
}
