type Story = {
  id: number;
  image: string;
}

type User = {
  id: Number;
  name: String;
  avatar: ImageSourcePropType;
  images: Story[];
};

type StorageData = {
  id: string;
  stories: {
    id: string;
  }[];
};