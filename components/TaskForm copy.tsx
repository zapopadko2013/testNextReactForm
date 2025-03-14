'use client'; 


import React, { useRef, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface FormInputs {
  title: string;
  description: string;
  tags: string;
  budget_from: number;
  budget_to: number;
  deadline: number;
  reminds: number;
  rules: string;
  budget_fromp: number;
  budget_top: number;
  deadlinep: number;
  qtyp: number;
}

const TaskForm = () => {
  const [token, setToken] = useState<string | null>('');
  const [message, setMessage] = useState<string>('');
  const [isTrue, setIsTrue] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  useEffect(() => {
    const storedtoken = localStorage.getItem('token');
    if (storedtoken) {
      setToken(storedtoken);
    }
  }, []);

  const toggleSwitch = () => {
    setIsTrue((prevState) => !prevState);
  };


  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {


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
        rules: data.rules, // Добавляем новый элемент `rules`
      };

    }

    console.log(JSON.stringify(requestBody));
    console.log(JSON.stringify(data.rules));
    

      //////

      /*
      const response = await axios.get(
        `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=${token}&title=${encodeURIComponent(data.title)}&description=${encodeURIComponent(data.description)}&tags=${encodeURIComponent(data.tags)}&budget_from=${data.budget_from}&budget_to=${data.budget_to}&deadline=${data.deadline}&reminds=${data.reminds}&all_auto_responses=false&rules=${encodeURIComponent(JSON.stringify(JSON.parse(data.rules)))}`,
      );
      */
      const url = 'https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask';
      const response = await axios.get(url,  {
        params: requestBody,
      } );
      if (response.status === 200) {
        setMessage('Задача успешно опубликована!');
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
    <div className="max-w-xl mx-auto p-8 border rounded-md shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Форма для создания задачи</h1>

      <div className="flex items-center space-x-4">
      <span className={`text-lg ${isTrue ? 'text-green-500' : 'text-red-500'}`}>
       Правила убрать {isTrue ? 'True' : 'False'}
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
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Token field */}
        <div className="flex flex-col">
          <label htmlFor="token" className="mb-1">Токен (для запоминания)</label>
          <input
            type="text"
            id="token"
            value={token || ''}
            onChange={handleTokenChange}
            className="border p-2 rounded-md"
            required
          />
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1">Название задачи</label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Это поле обязательно' })}
            className="border p-2 rounded-md"
          />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1">Описание задачи</label>
          <textarea
            id="description"
            {...register('description', { required: 'Это поле обязательно' })}
            className="border p-2 rounded-md"
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        {/* Tags */}
        <div className="flex flex-col">
          <label htmlFor="tags" className="mb-1">Теги</label>
          <input
            id="tags"
            type="text"
            {...register('tags', { required: 'Это поле обязательно' })}
            className="border p-2 rounded-md"
          />
          {errors.tags && <span className="text-red-500">{errors.tags.message}</span>}
        </div>

        {/* Budget From */}
        <div className="flex flex-col">
          <label htmlFor="budget_from" className="mb-1">Бюджет от</label>
          <input
            id="budget_from"
            type="number"
            {...register('budget_from', { required: 'Это поле обязательно' })}
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
            {...register('budget_to', { required: 'Это поле обязательно' })}
            className="border p-2 rounded-md"
          />
          {errors.budget_to && <span className="text-red-500">{errors.budget_to.message}</span>}
        </div>

        {/* Deadline */}
        <div className="flex flex-col">
          <label htmlFor="deadline" className="mb-1">Срок (в днях)</label>
          <input
            id="deadline"
            type="number"
            {...register('deadline', { required: 'Это поле обязательно' })}
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

        {/* Rules */}
        <div className="flex flex-col">
          <label htmlFor="rules" className="mb-1">Правила (в формате JSON)</label>
          <textarea
            id="rules"
            {...register('rules', { required: 'Это поле обязательно' })}
            className="border p-2 rounded-md"
          />
          {errors.rules && <span className="text-red-500">{errors.rules.message}</span>}
        </div>

        <div className="flex flex-col">

        
        <h1 className="text-2xl font-semibold mb-6">Правила для задачи</h1>
        <div className="flex flex-col">        
        <label htmlFor="budget_fromp" className="mb-1">Бюджет от</label>
          <input
            id="budget_fromp"
            type="number"
            {...register('budget_fromp', { required: 'Это поле обязательно' })}
            className="border p-2 rounded-md"
          />
          {errors.budget_fromp && <span className="text-red-500">{errors.budget_fromp.message}</span>}
        </div>

        <div className="flex flex-col">
        <label htmlFor="budget_top" className="mb-1">Бюджет до</label>
          <input
            id="budget_top"
            type="number"
            {...register('budget_top', { required: 'Это поле обязательно' })}
            className="border p-2 rounded-md"
          />
          {errors.budget_top && <span className="text-red-500">{errors.budget_top.message}</span>}
        </div>

        <div className="flex flex-col">
        <label htmlFor="deadlinep" className="mb-1">Срок (в днях)</label>
          <input
            id="deadlinep"
            type="number"
            {...register('deadlinep', { required: 'Это поле обязательно' })}
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


        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
          Создать задачу
        </button>
      </form>

      {/* Message */}
      {message && <div className="mt-4 text-center text-lg">{message}</div>}
    </div>
  );
};

export default TaskForm;
