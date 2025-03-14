'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function TaskForm() {
  const [token, setToken] = useState(''); // Запоминаем токен
 //const [token, setToken] = useState('') ; // Запоминаем токен
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [budgetFrom, setBudgetFrom] = useState('');
  const [budgetTo, setBudgetTo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [reminds, setReminds] = useState('');
  const [rules, setRules] = useState();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTrue, setIsTrue] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const storedtoken = localStorage.getItem('token');
    if (storedtoken) {
      setToken(storedtoken);
    }
  }, []);

  const toggleSwitch = () => {
    setIsTrue((prevState) => !prevState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(register);

    localStorage.setItem('token', token);

    setLoading(true);
    setMessage('');

    console.log("1");
    

    let requestBody = {}

    if (isTrue) { 

       requestBody = {
        token,
        title,
        description,
        tags,
        budget_from: budgetFrom,
        budget_to: budgetTo,
        deadline,
        reminds,
        all_auto_responses: isTrue,
      
     
      };
      


    }
    else {

      const r11=JSON.parse(rules);
    console.log("2");

     requestBody = {
      token,
      title,
      description,
      tags,
      budget_from: budgetFrom,
      budget_to: budgetTo,
      deadline,
      reminds,
      all_auto_responses: isTrue,
	  
	 // rules: rules,
     // rules: JSON.parse(rules),
	 rules: JSON.stringify(JSON.parse(rules)),
	 //rules:JSON.stringify(JSON.parse(rules))
   //rules: JSON.stringify(rules),
	 
    };
    
  }

    console.log("3");

    const params11 = new URLSearchParams({
      userId: 123,
      postId: 456
    });

    try {

      const url = 'https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask';


    // Query parameters
    const params = {
      token: '317ad1fc-e0a9-11ef-a978-0242ac120007',
      title: 'Сделать дизайн баннера',
      description: 'Сделать дизайн карточки товара с нашими фото для вк',
      tags: 'вб, дизайн, фигма',
      budget_from: 1000,
      budget_to: 5000,
      deadline: 1,
      reminds: 3,
      all_auto_responses: 'false',
      rules: JSON.stringify({
        budget_from: 5000,
        budget_to: 8000,
        deadline_days: 5,
        qty_freelancers: 1,
      }),
      // Directly send JSON as a string
    };

    console.log("4");
     console.log(JSON.stringify(params));
	 console.log(JSON.stringify(requestBody));
	 
  // const params12 = new URLSearchParams(requestBody);
   
    
      // Making GET request with query parameters
    
      const res = await axios.get(url,  {
  params: requestBody,
} );

//const url1 = `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?${params12}`;

//console.log(url1);
// Отправляем запрос с использованием fetch
//const res = await fetch(url1);
  /*  
	  
	  const res = await fetch('https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask', {
        method: 'POST',
        headers: {
			
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
	  
	  */
	  
     // const url = 'https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask';
     // console.log(`${url}?${requestBody.toString()}`);

      /*
    // Prepare the URL query parameters
    const params = new URLSearchParams({
      token: '317ad1fc-e0a9-11ef-a978-0242ac120007',
      title: 'Сделать дизайн баннера',
      description: 'Сделать дизайн карточки товара с нашими фото для вк',
      tags: 'вб, дизайн, фигма',
      budget_from: 1000,
      budget_to: 5000,
      deadline: 1,
      reminds: 3,
      all_auto_responses: false,
      rules: JSON.stringify({
        budget_from: 5000,
        budget_to: 8000,
        deadline_days: 5,
        qty_freelancers: 1,
      }),
    });

    {
        "budget_from": 5000,
        "budget_to": 8000,
        "deadline_days": 5,
        "qty_freelancers": 1
      }

    */
/*
      console.log(`${url}?${requestBody.toString()}`);
   
      const res = await fetch(`${url}?${requestBody.toString()}`, {
        method: 'GET',
      });
*/

     /*
	  const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      const res = await fetch("https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask?token=317ad1fc-e0a9-11ef-a978-0242ac120007&title=%D0%A1%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C%20%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%20%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%B0&description=%D0%A1%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C%20%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%20%D0%BA%D0%B0%D1%80%D1%82%D0%BE%D1%87%D0%BA%D0%B8%20%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%B0%20%D1%81%20%D0%BD%D0%B0%D1%88%D0%B8%D0%BC%D0%B8%20%D1%84%D0%BE%D1%82%D0%BE%20%D0%B4%D0%BB%D1%8F%20%D0%B2%D0%B1&tags=%D0%B2%D0%B1%2C%20%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%2C%20%D1%84%D0%B8%D0%B3%D0%BC%D0%B0&budget_from=1000&budget_to=5000&deadline=1&reminds=3&all_auto_responses=false&rules=%7B%22budget_from%22%3A5000%2C%22budget_to%22%3A8000%2C%22deadline_days%22%3A5%2C%22qty_freelancers%22%3A1%7D", requestOptions)
     */

      if (res.status == 200) {
        setMessage('Задача успешно опубликована!');
        alert('Задача успешно опубликована!');
      } else {
        setMessage('Ошибка при публикации задачи.');
        alert('Ошибка при публикации задачи.');
      }
    } catch (error) {
      setMessage('Произошла ошибка при отправке запроса.');
      alert('Произошла ошибка при отправке запроса.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Форма публикации задачи</h2>
      
      <div className="flex items-center space-x-4">
      <span className={`text-lg ${isTrue ? 'text-green-500' : 'text-red-500'}`}>
        {isTrue ? 'True' : 'False'}
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
        <div className="mb-4">
          <label htmlFor="token" className="block text-sm font-semibold mb-2">Token</label>
          <input
            type="text"
            id="token"
            value={token}
			
            onChange={(e) => {
              const value = e.target.value;
              setToken(value);
             // localStorage.setItem('token', value);
            }}
            {...register('token', { required: 'Name is required' })}
            className="w-full p-2 border border-gray-300 rounded"
            
          />
          {errors.token && <p>{errors.token.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-2">Заголовок</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            {...register('title', { required: 'Name is required' })}
            
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold mb-2">Описание</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-semibold mb-2">Теги</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            {...register('tags', { required: 'Name is required' })}
            
          />
          {errors.tags && <p>{errors.tags.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="budgetFrom" className="block text-sm font-semibold mb-2">Бюджет от</label>
          <input
            type="number"
            id="budgetFrom"
            value={budgetFrom}
            onChange={(e) => setBudgetFrom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            {...register('budgetFrom', { required: 'Name is required' })}
            
          />
          {errors.budgetFrom && <p>{errors.budgetFrom.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="budgetTo" className="block text-sm font-semibold mb-2">Бюджет до</label>
          <input
            type="number"
            id="budgetTo"
            value={budgetTo}
            onChange={(e) => setBudgetTo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            {...register('budgetTo', { required: 'Name is required' })}
            
          />
          {errors.budgetTo && <p>{errors.budgetTo.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm font-semibold mb-2">Срок (дней)</label>
          <input
            type="number"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            {...register('deadline', { required: 'Name is required' })}
            
          />
          {errors.deadline && <p>{errors.deadline.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="reminds" className="block text-sm font-semibold mb-2">Напоминания</label>
          <input
            type="number"
            id="reminds"
            value={reminds}
            onChange={(e) => setReminds(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
           
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rules" className="block text-sm font-semibold mb-2">Правила</label>
          <textarea
            id="rules"
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder='{"budget_from":5000, "budget_to":8000, "deadline_days":5, "qty_freelancers":1}'
            
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Отправка...' : 'Опубликовать задачу'}
          </button>
        </div>
      </form>

      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
    </div>
  );
}