type Story = {
  id: Number;
  image: string;
}

type User = {
  id: Number;
  name: String;
  avatar: ImageSourcePropType;
  images: Story[];
};
