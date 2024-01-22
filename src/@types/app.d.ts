type Story =
  | {
      story_id: Number;
      story_image: ImageSourcePropType;
      story_video?: never;
    }
  | {
      story_id: Number;
      story_image?: never;
      story_video: AVPlaybackSource;
    };

type User = {
  user_id: Number;
  user_name: String;
  user_avatar: ImageSourcePropType;
  stories: Story[];
};
