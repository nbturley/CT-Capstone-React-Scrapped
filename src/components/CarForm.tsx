import Input from "./Input"

import { useForm } from 'react-hook-form'

import { server_calls } from "../api/server";
import { useDispatch, useStore } from "react-redux";
import { chooseName, chooseYear, chooseMake, chooseModel, chooseColor } from "../redux/slices/RootSlice";

interface CarFormProps {
  id?: string[]
}

const CarForm = ( props:CarFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id);
    console.log(data);
    
    if (props.id && props.id.length > 0) {
        server_calls.update(props.id[0], data)
        console.log(`Updataed: ${ data.first } ${props.id}`);
        setTimeout( () => {
            window.location.reload()
        }, 500)
    } else {
        dispatch(chooseName(data.name));
        dispatch(chooseYear(data.year));
        dispatch(chooseMake(data.make));
        dispatch(chooseModel(data.model));
        dispatch(chooseColor(data.color));

        server_calls.create(store.getState())
        setTimeout( () => {
            window.location.reload()
        }, 500)
    }
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Car Name</label>
          <Input {...register('name')} name='name' placeholder="Name" />
        </div>
        <div>
          <label htmlFor="year">Car Year</label>
          <Input {...register('year')} name='year' placeholder="Year" />
        </div>
        <div>
          <label htmlFor="make">Car Make</label>
          <Input {...register('make')} name='make' placeholder="Make" />
        </div>
        <div>
          <label htmlFor="model">Car Model</label>
          <Input {...register('model')} name='model' placeholder="Model" />
        </div>
        <div>
          <label htmlFor="color">Car Color</label>
          <Input {...register('color')} name='color' placeholder="Color" />
        </div>
        <div className="flex p-1">
          <button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default CarForm