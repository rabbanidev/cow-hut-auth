import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.inteface';
import { categories, labels, locations } from './cow.constant';

const cowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 1,
      required: true,
    },
    price: {
      type: Number,
      min: 1,
      required: true,
    },
    location: {
      type: String,
      enum: locations,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      min: 1,
      required: true,
    },
    label: {
      type: String,
      enum: labels,
      default: labels[0],
      required: true,
    },
    category: {
      type: String,
      enum: categories,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Cow = model<ICow, CowModel>('Cow', cowSchema);

export default Cow;
