import Link from 'next/link';
import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  Grid,
} from '@mantine/core';
import { Heart, Bookmark, Share } from 'tabler-icons-react';

import { RECIPE_PATH } from 'constants/routeName';
import type { RecipesQuery } from 'services/graphql/types/generated';

type Recipe = { recipe: RecipesQuery['recipes'][number] };

export const RecipeItem = ({ recipe }: Recipe) => {
  const {
    id,
    title,
    image,
    createdAtText,
    likeCount,
    favoriteCount,
    user,
    tags,
  } = recipe;
  const { nickname: userNickname, image: userImage } = user;
  const { classes, theme } = useStyles();

  return (
    <Link href={`${RECIPE_PATH}/${id}`} passHref>
      <Grid.Col sm={12} md={6} lg={4}>
        <Card withBorder p="lg" radius="md" className={classes.card}>
          <Card.Section mb="sm">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${image}`}
              alt={title}
              height={180}
            />
          </Card.Section>

          {tags?.map((tag) => (
            <Badge key={tag.id} mr={5} color="teal">
              {tag.name}
            </Badge>
          ))}

          <Text weight={700} className={classes.title} mt="xs">
            {title}
          </Text>

          <Group mt="lg">
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${userImage}`}
              radius="sm"
            />
            <div>
              <Text weight={500}>{userNickname}</Text>
              <Text size="xs" color="dimmed">
                {createdAtText}に投稿
              </Text>
            </div>
          </Group>

          <Card.Section className={classes.footer}>
            <Group position="apart">
              <Text size="xs" color="dimmed">
                {/* フッター */}
              </Text>
              <Group spacing={0}>
                <ActionIcon size={40} mr={15}>
                  <Heart size={18} color={theme.colors.red[6]} />
                  <Text size="sm" ml={3}>
                    {likeCount}
                  </Text>
                </ActionIcon>
                <ActionIcon size={40} mr={15}>
                  <Bookmark size={18} color={theme.colors.yellow[6]} />
                  <Text size="sm" ml={3}>
                    {favoriteCount}
                  </Text>
                </ActionIcon>
                <ActionIcon size={40}>
                  <Share size={16} color={theme.colors.blue[6]} />
                </ActionIcon>
              </Group>
            </Group>
          </Card.Section>
        </Card>
      </Grid.Col>
    </Link>
  );
};

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));
