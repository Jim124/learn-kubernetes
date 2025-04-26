import mongoose from 'mongoose';

const ColorSchema = new mongoose.Schema({
  key: String,
  value: String,
});

const Color = mongoose.model('Color', ColorSchema);

export const saveColor = async ({ key, value }) => {
  const color = await Color.find({ key });
  if (color) {
    color.set(value);
  } else {
    color = new Color({ key, value });
  }
  await color.save();
};

export const getColors = async () => await Color.find();

export const getColor = async ({ key }) => {
  let color = await Color.findOne({ key });
  if (!color) {
    color = process.env.DEFAULT_COLOR;
  }
  return color || 'blue';
};
