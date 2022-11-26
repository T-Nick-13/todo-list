import React from 'react';
import taskLogo from '../../images/icons8-список-задач-50.png';
import desckLogo from '../../images/icons8-содержание-24.png';
import uploadLogo from '../../images/icons8-загрузить-32.png';

function Task(props) {

  const activePopup = props.activePopup ? 'popup popup_active' : 'popup';
  const activeForm = props.activePopup ? 'popup__form popup__form_active' : 'popup__form';


  function closePopup() {
    props.onPopupClose();
  }

  function submitSave(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <div className={activePopup}>
      <form className={activeForm} noValidate onSubmit={submitSave}>
        <div className="popup__container">
          <label className="popup__label">Название задачи
            <img src={taskLogo} className="popup__img" alt="task"></img>
            <input id="name" className="popup__input" name="email" type="text"
              /* value={data.email} onChange={handleChange} */ />
          </label>
          <label className="popup__label popup__label_text">Описание
            <img src={desckLogo} className="popup__img" alt="description"></img>
            <textarea id="desc" className="popup__textarea" name="desc"
              /* value={data.email} onChange={handleChange} */ />
          </label>
          <div className="popup__label">Вложение
            <img src={uploadLogo} className="popup__img" alt="description"></img>
            <input className="popup__input-upload" id="popup__input" type="file" accept="image/*" />
            <label className="popup__label-upload" htmlFor="popup__input">Выберите файл</label>
          </div>
          <div className="popup__info-container">
            <div className="task__term task-list__term" title="срок выполнения">23.11.22</div>
            <div className="task__status task-list__status" title="статус">Ожидание</div>
          </div>
        </div>
        <button className="popup__close-btn" type="button" onClick={closePopup}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" x2="100" y1="0" y2="100" />
            <line x1="0" x2="100" y1="100" y2="0" />
          </svg>
        </button>
        <div className="popup__btn-container">
          <button className="popup__btn" type="submit">Сохранить</button>
          <button className="popup__btn" type="button" onClick={closePopup}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default Task;
