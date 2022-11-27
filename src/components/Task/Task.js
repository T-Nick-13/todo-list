import React from 'react';
import taskLogo from '../../images/icons8-список-задач-50.png';
import desckLogo from '../../images/icons8-содержание-24.png';
import uploadLogo from '../../images/icons8-загрузить-32.png';

function Task(props) {

  const [isValid, setIsValid] = React.useState(false);
  const [fileData, setFileData] = React.useState('');
  const [taskData, setTaskData] = React.useState({
    title: '',
    description: ''
  })
  const [fileName, setFileName] = React.useState('');
  const [fileLatName, setFileLatName] = React.useState('');


  const activeTask = props.activeTask ? 'popup popup_active' : 'popup';
  const activeForm = props.activeTask ? 'popup__form popup__form_active' : 'popup__form';


  function checkFileType(file) {
    if (file.size <= 5242880) {
      const name = translit(file.name);
      setFileLatName(name);
      setFileData(file);
      setFileName(file.name);
      } else alert(`Размер файла должен быть до 5мб. Текущий размер ${file.size}`);
  }

  function closePopup() {
    props.onPopupClose();
  }

  function handleFileChange(e) {
    checkFileType(e.target.files[0]);
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setTaskData({
      ...taskData,
      [name]: value
    });
  }

  function submitSave(e) {
    e.preventDefault();
    props.onSubmit(taskData, fileData, fileLatName);
  }

  function translit(word){
    var answer = '';
    var converter = {
      'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
      'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
      'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
      'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
      'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
      'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
      'э': 'e',    'ю': 'yu',   'я': 'ya',

      'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
      'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
      'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
      'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
      'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
      'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
      'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
    };

    for (var i = 0; i < word.length; ++i ) {
      if (converter[word[i]] == undefined){
        answer += word[i];
      } else {
        answer += converter[word[i]];
      }
    }

    return answer;
  }


  return (
    <div className={activeTask}>
      <form className={activeForm} noValidate onSubmit={submitSave}>
        <div className="popup__container">
          <label className="popup__label">Название задачи
            <img src={taskLogo} className="popup__img" alt="task"></img>
            <input id="title" className="popup__input" name="title" type="text" onChange={handleChange}
              /* value={data.email} onChange={handleChange} */ />
          </label>
          <label className="popup__label popup__label_text">Описание
            <img src={desckLogo} className="popup__img" alt="description"></img>
            <textarea id="description" className="popup__textarea" name="description" onChange={handleChange}
              /* value={data.email} onChange={handleChange} */ />
          </label>
          <div className="popup__label">Вложение
            <img src={uploadLogo} className="popup__img" alt="upload"></img>
            <input className="popup__input-upload" id="popup__input" type="file" /* accept="image/*" */ onChange={handleFileChange}/>
            <label className="popup__label-upload" htmlFor="popup__input">Выберите файл</label>
            <span className="popup__file-name">{fileName}</span>
          </div>
          <div className="popup__info-container">
            <div className="task__term task-list__term" title="срок выполнения">23.11.22</div>
            <div className="task__status task-list__status" title="статус">Ожидание</div>
          </div>
        </div>
        <button className="popup__close-btn btn-cross" type="button" onClick={closePopup}>
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
