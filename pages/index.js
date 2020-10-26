import React, { useState } from "react";
import { useForm } from "react-hook-form";

const index = () => {
  const { register, handleSubmit, errors } = useForm();
  const [values, setValues] = useState([]);
  const onSubmit = (data, e) => {
    setValues((prev) => {
      let oldArr = [...prev];
      oldArr.push({ todo: data.todo, done: false });
      return oldArr;
    });
    e.target.reset();
  };

  const onDone = (index) => {
    setValues((prev) => {
      let oldArr = [...prev];
      oldArr.splice(index, 1, { todo: prev[index].todo, done: true });
      return oldArr;
    });
  };
  return (
    <div className="container">
      <h1>todo list App</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="todo" ref={register({ required: true })} />{" "}
        <input type="submit" />{" "}
        <button onClick={() => setValues([])}>reset</button>
      </form>
      {errors.todo && "กรอก something *"}
      <br />
        {values.length > 0 ? (
          values.map((item, index) => {
            if (item.done) {
              return (
                <li key={index}>
                  <del>{item.todo}</del>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  {item.todo}{" "}
                  <button onClick={() => onDone(index)}>done</button>
                </li>
              );
            }
          })
        ) : (
          <li>ไม่มีรายการ</li>
        )}
    </div>
  );
};

export default index;
