import type { Meta, StoryObj } from '@storybook/react';
import Thumbnail from './Thumbnail';

const meta: Meta<typeof Thumbnail> = {
  title: 'Example/Thumbnail',
  component: Thumbnail,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '유저의 프로필 사진을 나타내는 컴포넌트 입니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Profile: Story = {
  args: {
    size: 160,
    src: 'https://avatars.githubusercontent.com/u/77034159?v=4',
  },
};

export const Menu: Story = {
  args: {
    size: 40,
    src: 'https://avatars.githubusercontent.com/u/77034159?v=4',
  },
};

export const Default: Story = {
  args: {
    size: 40,
  },
};
