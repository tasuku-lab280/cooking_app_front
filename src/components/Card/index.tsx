import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from '@mantine/core';

type Props = {
  title: string;
  image: string;
  createdAt: string;
};

export const RecipeItem = (props: Props) => {
  const { title, image, createdAt } = props;
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div className="w-80 mr-5 mb-5">
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src={image} height={160} alt="Norway" />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text size="sm">{createdAt}</Text>
          <Badge color="pink" variant="light">
            On Sale
          </Badge>
        </Group>

        <Text
          size="md"
          weight={800}
          style={{ color: secondaryColor, lineHeight: 1.5 }}
          lineClamp={3}
        >
          {title}
        </Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
        >
          Book classic tour now
        </Button>
      </Card>
    </div>
  );
};
