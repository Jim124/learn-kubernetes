import mongoose from 'mongoose';

const ColorSchema = new mongoose.Schema({
  key: String,
  value: String,
});

const Color = mongoose.model('Color', ColorSchema);

export const saveColor = async ({ key, value }) => {
  let color = await Color.findOne({ key });
  if (color) {
    color.set({ value });
  } else {
    color = new Color({ key, value });
  }
  await color.save();
};

export const getColors = async () => await Color.find();

export const getColor = async ({ key, strict = false }) => {
  let color = await Color.findOne({ key });
  if (strict && !color) {
    return undefined;
  }
  if (color) {
    return color.value;
  }
  return process.env.DEFAULT_COLOR || 'blue';
};

export const deleteColor = async ({ key }) => await Color.deleteOne({ key });
