'use client'; 


import React, { useRef, useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axios from 'axios';

interface FormInputs {
  title: string;
  description: string;
  tagsn: string[];
  budget_from: number;
  budget_to: number;
  deadline: number;
  reminds: number;
  rules: string;
  budget_fromp: number;
  budget_top: number;
  deadlinep: number;
  qtyp: number;
  token: string;
  tag: string;
}

const TaskForm = () => {
  //const [token, setToken] = useState<string | null>('');
  const [message, setMessage] = useState<string>('');
  const [isTrue, setIsTrue] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  // Получаем значения полей
  
  
  const {control, register, handleSubmit, formState: { errors }, watch, setValue, reset, getValues, clearErrors } = useForm<FormInputs>(

    {
      defaultValues: {
        deadline: 0,
        reminds: 0,
        deadlinep: 0,
        qtyp: 0,
      }
    }
  );

  const field1 = watch('budget_from');
  const field2 = watch('budget_to');
  const field3 = watch('budget_fromp');
  const field4 = watch('budget_top');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setValue('token', savedToken);
    }
  }, [setValue]
);

  const toggleSwitch = () => {
    setIsTrue((prevState) => !prevState);
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));  // Удаление тега из массива
    //setTag(tags.filter(tag => tag !== tagToRemove));
    setValue('tagsn', tags.filter(tag => tag !== tagToRemove));
  };

  
  // Обработчик для кнопки "Добавить"
  const onAddTag = () => {
    const tag = getValues('tag');  // Получаем значение из поля "tag"
   //const tag = '1'; 
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);  // Добавляем новый тег
      //setTag([...tags, tag]);
      setValue('tagsn',[...tags, tag]);
      setValue('tag', ''); 
      clearErrors('tag');
     // reset();  // Очистка поля ввода
    }
  };
 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
     // e.preventDefault(); // Предотвращаем стандартное поведение (например, переход на новую строку)
     // handleSubmit(onSubmit)(); // Отправляем форму
    }
  };


  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {

      localStorage.setItem('token', data.token);

      /*
      //////

      let requestBody = {
        token,
        title: data.title,
        description: data.description,
        tags: data.tags,
        budget_from: data.budget_from,
        budget_to: data.budget_to,
        deadline: data.deadline,
        reminds: data.reminds,
        all_auto_responses: isTrue,
      }

    if (isTrue==false) { 

                
      

      requestBody = {
        ...requestBody,
        
        rules:JSON.stringify({
          budget_from: Number(data.budget_fromp),
          budget_to: Number(data.budget_top),
          deadline_days: Number(data.deadlinep),
          qty_freelancers: Number(data.qtyp),
        }),
      };

    }

    console.log(JSON.stringify(requestBody));
    */
    let rul='';
    let url='';
    if (isTrue==false) { 

                
      

      rul = JSON.stringify({
          budget_from: Number(data.budget_fromp),
          budget_to: Number(data.budget_top),
          deadline_days: Number(data.deadlinep),
          qty_freelancers: Number(data.qtyp),
       
      });
      url=`&rules=`;

    }
    

      //////

      /*
      const response = await axios.get(
        `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${token}&title=${encodeURIComponent(data.title)}&description=${encodeURIComponent(data.description)}&tags=${encodeURIComponent(data.tags)}&budget_from=${data.budget_from}&budget_to=${data.budget_to}&deadline=${data.deadline}&reminds=${data.reminds}&all_auto_responses=false&rules=${encodeURIComponent(JSON.stringify(JSON.parse(data.rules)))}`,
      );
      */
     /*
      const response = await axios.get(
        `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${encodeURIComponent(data.token)}&title=${encodeURIComponent(data.title)}&description=${encodeURIComponent(data.description)}&tags=${encodeURIComponent(data.tagsn)}&budget_from=${data.budget_from}&budget_to=${data.budget_to}&deadline=${data.deadline}&reminds=${data.reminds}&all_auto_responses=${isTrue}${url}${encodeURIComponent(rul)}`,
      );
      */
      const response = await fetch(`https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${encodeURIComponent(data.token)}&title=${encodeURIComponent(data.title)}&description=${encodeURIComponent(data.description)}&tags=${encodeURIComponent(data.tagsn)}&budget_from=${data.budget_from}&budget_to=${data.budget_to}&deadline=${data.deadline}&reminds=${data.reminds}&all_auto_responses=${isTrue}${url}${encodeURIComponent(rul)}`, {
        method: "GET", // Метод GET
        headers: {
          "Content-Type": "application/json", // Указание типа данных
        },
      });
     /*
      const url = 'https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask';
      const response = await axios.get(url,  {
        params: requestBody,
      } );
      */
      if (response.status === 200) {
        //setMessage('Задача успешно опубликована!');
        reset();  // Очистка поля ввода
        setTags([]);

        setValue('budget_fromp', '');
        setValue('budget_top', '');
        setValue('deadlinep', 0);
        setValue('qtyp', 0);

       
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
          setValue('token', savedToken);
        }
        alert('Задача успешно опубликована!');
        
      } else {
        setMessage('Ошибка при публикации задачи.');
        alert('Ошибка при публикации задачи.');
      }
    } catch (error) {
      setMessage('Ошибка при отправке данных.');
      alert('Произошла ошибка при отправке запроса.');
    }
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
    
    localStorage.setItem('token', e.target.value);
  };

  return (
    


<div className="min-h-screen flex">


  {/* Левая панель */}
  <div className="flex-grow p-8 bg-gray-100">

 

      <h1 className="text-2xl font-semibold mb-6">Форма для создания задачи</h1>

      <div className="flex items-center space-x-4">
      <span className={`text-lg ${isTrue ? 'text-green-500' : 'text-red-500'}`}>
       Правила убрать
      </span>
      <button
        onClick={toggleSwitch}
        className={`w-16 h-8 flex items-center rounded-full p-1 ${
          isTrue ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full transition-all duration-300 ${
            isTrue ? 'transform translate-x-8' : ''
          }`}
        ></div>
      </button>
    </div>
      
    <form onSubmit={handleSubmit(onSubmit)}>
     
        {/* Token field */}
        <div className="flex flex-col">
          <label htmlFor="token" className="mb-1">Токен (для запоминания)</label>
          <input
            id="token"
            type="text"
            {...register('token', { required: 'Это поле обязательно' })}
            className="border p-2 rounded-md"
          />
          {errors.token && <span className="text-red-500">{errors.token.message}</span>}
        
          <label className="mb-1 text-sm text-gray-500 cursor-not-allowed">Пример токена: 317ad1fc-e0a9-11ef-a978-0242ac120007</label>
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1">Название задачи</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Это поле обязательно', minLength: {
              value: 3,
              message: 'Минимум 3 символа'
            } })}
            className="border p-2 rounded-md"
          />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1">Описание задачи</label>
          <textarea
            id="description"
            {...register('description')}
            className="border p-2 rounded-md"
          />
          
        </div>

        {/* Tags */}
        <div className="flex flex-col">
        <label htmlFor="tag" className="mb-1">Тег</label>
        <div className="relative">
          <input
            id="tag"
            type="text"
            onKeyDown={handleKeyDown}  // Добавляем обработчик нажатия клавиши
            {...register('tag', { 
              
              
                
                required: tags.length==0 ? 'Это поле обязательно' : false
              ,
              validate: {
                nonEmpty: (value) => {
                  if (tags.length === 0 ) {
                    return 'Добавьте хотя бы один тег';
                  }
                  return true;
                },
              },
              
              }



            )}
            className={`border p-2 pr-50 rounded-md `}
          />
          
      
          <button
              type="button"
              onClick={() => onAddTag()}  // Удаление тега при клике
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-blue-500 px-4 py-1 rounded-md text-xs"
        >
              ↵
            </button>
            </div>
            {errors.tag && <span className="text-red-500">{errors.tag.message}</span>}
        
        </div>
        {/* Список тегов */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full flex items-center gap-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}  // Удаление тега при клике
              className="text-gray-600 hover:text-red-500"
            >
              &times; {/* Символ крестика */}
            </button>
          </span>
        ))}
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Budget From */}
        <div className="flex flex-col">
          <label htmlFor="budget_from" className="mb-1">Бюджет от</label>
          <input
            id="budget_from"
            type="number"
            placeholder="От"
            {...register('budget_from', { required: 'Это поле обязательно'

             })}
            className="border p-2 rounded-md"
          />
          {errors.budget_from && <span className="text-red-500">{errors.budget_from.message}</span>}
        </div>

        
        {/* Budget To */}
        <div className="flex flex-col">
          <label htmlFor="budget_to" className="mb-1">Бюджет до</label>
          <input
            id="budget_to"
            type="number"
            placeholder="До"
            {...register('budget_to', { required: 'Это поле обязательно'
              ,validate: (value) => {
                // Проверка, что значение в field2 больше или равно значению в field1
                //console.log('d');
                //console.log(value);
                //console.log(data.budget_to);
                if (parseInt(value) < parseInt(field1)) {
                  return 'Минимальный бюджет не может быть больше максимального';
                }
              }


             })}
            className="border p-2 rounded-md"
          />
          {errors.budget_to && <span className="text-red-500">{errors.budget_to.message}</span>}
        </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Deadline */}
        <div className="flex flex-col">
          <label htmlFor="deadline" className="mb-1">Срок (в днях)</label>
          <input
            id="deadline"
            type="number"
            {...register('deadline', { required: '1 и более дней' })}
            className="border p-2 rounded-md"
          />
          {errors.deadline && <span className="text-red-500">{errors.deadline.message}</span>}
        </div>

        {/* Reminds */}
        <div className="flex flex-col">
          <label htmlFor="reminds" className="mb-1">Напоминания</label>
          <input
            id="reminds"
            type="number"
            {...register('reminds', { required: 'Это поле обязательно' })}
            className="border p-2 rounded-md"
          />
          {errors.reminds && <span className="text-red-500">{errors.reminds.message}</span>}
        </div>
       
        </div>

       <div className="h-4"></div> {/* Этот div создаёт пустое пространство перед кнопкой */}



        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
          Создать задачу
        </button>
      
        
      {/* Message */}
      {message && <div className="mt-4 text-center text-lg">{message}</div>}

      </form>

      </div>


      <div className={`transition-all duration-300 ${
          !isTrue ? 'w-1/2' : 'w-0'
        } overflow-hidden p-8 bg-gray-200`}>


      {!isTrue ? (


      <div className="flex flex-col">

        
<h1 className="text-2xl font-semibold mb-6">Правила для задачи</h1>
<div className="flex flex-col">        
<label htmlFor="budget_fromp" className="mb-1">Бюджет от</label>
  <input
    id="budget_fromp"
    type="number"
    placeholder="От"
    {...register('budget_fromp', { required: 'Это поле обязательно',
     
    })}
    className="border p-2 rounded-md"
  />
  {errors.budget_fromp && <span className="text-red-500">{errors.budget_fromp.message}</span>}
</div>

<div className="flex flex-col">
<label htmlFor="budget_top" className="mb-1">Бюджет до</label>
  <input
    id="budget_top"
    type="number"
    placeholder="До"
    {...register('budget_top', { required: 'Это поле обязательно'


      ,validate: (value) => {
        // Проверка, что значение в field2 больше или равно значению в field1
        //console.log('d');
        //console.log(value);
        //console.log(data.budget_to);
        if (parseInt(value) < parseInt(field3)) {
          return 'Минимальный бюджет не может быть больше максимального';
        }
      }
     })}
    className="border p-2 rounded-md"
  />
  {errors.budget_top && <span className="text-red-500">{errors.budget_top.message}</span>}
</div>

<div className="flex flex-col">
<label htmlFor="deadlinep" className="mb-1">Срок (в днях)</label>
  <input
    id="deadlinep"
    type="number"
    {...register('deadlinep', { required: '1 и более дней' })}
    className="border p-2 rounded-md"
  />
  {errors.deadlinep && <span className="text-red-500">{errors.deadlinep.message}</span>}
</div>

<div className="flex flex-col">
<label htmlFor="qtyp" className="mb-1">Число фрилансеров</label>
  <input
    id="qtyp"
    type="number"
    {...register('qtyp', { required: 'Это поле обязательно' })}
    className="border p-2 rounded-md"
  />
  {errors.qtyp && <span className="text-red-500">{errors.qtyp.message}</span>}
</div>


</div>
 ): (<div className="flex flex-col"> </div>)}



</div>


</div>

    
  );
};

export default TaskForm;
